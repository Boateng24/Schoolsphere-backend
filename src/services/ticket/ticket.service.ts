import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  Status,
  TicketDto,
  TicketParams,
  TicketUpdateDto,
} from 'src/Dtos/ticket.dto';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';
import {
  StudentParams,
  TeacherParams,
  UserParams,
  RequesterType,
} from 'src/Dtos/other-authdtos.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}
  async createTicket(
    ticket: TicketDto,
    studentId: string,
    teacherId: string,
    userId: string,
  ) {
    try {
      let requesterId: string;
      let requesterType: RequesterType;
      let foundUser: any;
      // Check for student
      foundUser = await this.prisma.student.findFirst({
        where: { rollId: studentId },
      });
      if (foundUser) {
        requesterType = RequesterType.Student;
        requesterId = foundUser['rollId'];
      }

      // Check for teacher
      if (!foundUser) {
        foundUser = await this.prisma.teacher.findFirst({
          where: { employeeId: teacherId },
        });
        if (foundUser) {
          requesterType = RequesterType.Teacher;
          requesterId = foundUser['employeeId'];
        }
      }

      // Check for other user
      if (!foundUser) {
        foundUser = await this.prisma.user.findFirst({
          where: { employeeId: userId },
        });
        if (foundUser) {
          requesterType = RequesterType.Other;
          requesterId = foundUser['employeeId'];
        }
      }
      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      const ticketData = {
        ...ticket,
        status: Status.PENDING,
        studentId: requesterType === RequesterType.Student ? studentId : null,
        teacherId: requesterType === RequesterType.Teacher ? teacherId : null,
        userId: requesterType === RequesterType.Other ? userId : null,
      };

      // Create the ticket
      const newTicket = await this.prisma.tickets.create({
        data: ticketData as any,
      });

      const ticketId = newTicket.ticketId;
      // Notify approvers
      const content = `${foundUser['firstName']} ${
        foundUser['lastName']
      } has requested for ${ticket.item} on ${new Date(
        ticket.date,
      ).toDateString()} and it's pending your approval`;

      // Notify approvers with the requester's information
      const notification = await this.notify.notifyApprovers(
        content,
        requesterId,
        requesterType,
        ticketId,
      );

      return {
        ticketRaised: newTicket,
        notice: notification,
        message: 'Ticket Raised Successfully',
      };
    } catch ({ response }) {
      return response;
    }
  }

  async approveTicket(Id: TicketParams) {
    try {
      const approvedTicket = await this.prisma.tickets.findFirst({
        where: {
          AND: [{ ticketId: Id.ticketId }, { status: Status.APPROVED }],
        },
      });

      if (approvedTicket) {
        throw new ConflictException('Ticket already approved');
      }
      const approval = await this.prisma.tickets.update({
        where: {
          ticketId: Id.ticketId,
        },
        data: {
          status: Status.APPROVED,
        },
      });
      const requesterId =
        approval.studentId || approval.teacherId || approval.userId;
      if (requesterId) {
        await this.prisma.notification.updateMany({
          where: {
            OR: [
              { studentId: approval.studentId },
              { teacherId: approval.teacherId },
              { userId: approval.userId },
            ],
          },
          data: {
            isRead: true,
          },
        });
      }
      return {
        approved: approval,
        message: 'Ticket Approved Successfully',
      };
    } catch ({ response }) {
      return response;
    }
  }

  async rejectTicket(Id: TicketParams) {
    try {
      const rejectedTicket = await this.prisma.tickets.findFirst({
        where: {
          AND: [{ ticketId: Id.ticketId }, { status: Status.REJECTED }],
        },
      });

      if (rejectedTicket) {
        throw new ConflictException('Ticket already rejected');
      }

      const rejection = await this.prisma.tickets.update({
        where: {
          ticketId: Id.ticketId,
        },
        data: {
          status: Status.REJECTED,
        },
      });

      const requesterId =
        rejection.studentId || rejection.teacherId || rejection.userId;
      if (requesterId) {
        await this.prisma.notification.updateMany({
          where: {
            OR: [
              { studentId: rejection.studentId },
              { teacherId: rejection.teacherId },
              { userId: rejection.userId },
            ],
          },
          data: {
            isRead: true,
          },
        });
      }

      return { rejected: rejection, message: 'Ticket Rejected' };
    } catch ({ response }) {
      return response;
    }
  }

  async getTicket(Id: TicketParams) {
    try {
      const fetchedTicket = await this.prisma.tickets.findFirst({
        where: {
          ticketId: Id.ticketId,
        },
      });
      return { fetchedTicket, message: 'Ticket Fetched Successfully' };
    } catch ({ response }) {
      return response;
    }
  }

  async getAllTickets(limit: number, skip: number) {
    try {
      const allTickets = await this.prisma.tickets.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          date: 'desc',
        },
        include: {
          notice: true,
        },
      });
      if (allTickets.length === 0) {
        return { message: 'No tickets found' };
      }
      return { allTickets, message: 'All Tickets Fetched Successfully' };
    } catch ({ response }) {
      return response;
    }
  }

  async deleteTicket(Id: TicketParams) {
    try {
      await this.prisma.tickets.delete({
        where: {
          ticketId: Id.ticketId,
        },
      });
      return { message: 'Ticket Deleted Successfully' };
    } catch ({ response }) {
      return response;
    }
  }

  async getAllTicketsofStudent(
    id: StudentParams,
    status: Status | null,
    name: string,
    limit: number,
    skip: number,
  ) {
    try {
      // Prepare the where clause for the query
      const whereClause: any = {
        studentId: id.studentId,
      };
      // Convert status to proper case or default to 'all'
      if (status && Object.values(Status).includes(status)) {
        whereClause.status = status;
      }

      if (name) {
        whereClause.name = { contains: name, mode: 'insensitive' };
      }

      const studentTickets = await this.prisma.tickets.findMany({
        where: whereClause,
        take: limit,
        skip: skip,
        orderBy: {
          date: 'desc',
        },
      });
      return {
        studentTickets,
        message: "Individual student's tickets fetched",
      };
    } catch ({ response }) {
      return response;
    }
  }

  async allTicketDelete() {
    try {
      await this.prisma.tickets.deleteMany();
      return { message: 'All tickets deleted' };
    } catch ({ response }) {
      return response;
    }
  }

  async updateTicket(ticket: TicketUpdateDto, Id: TicketParams) {
    try {
      const ticketUpdate = await this.prisma.tickets.update({
        where: {
          ticketId: Id.ticketId,
        },
        data: {
          ...ticket,
        },
      });
      return { ticketUpdate, message: 'Ticket updated successfully' };
    } catch ({ response }) {
      return response;
    }
  }

  async searchTicketsByName(query: string) {
    try {
      const searchedTicket = await this.prisma.tickets.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
      });
      return { searchedTicket, message: 'Ticket successfully searched' };
    } catch (error) {
      return { message: 'Error Searching for a Ticket', error };
    }
  }
  async filterTickets(type: string) {
    try {
      const statusParam =
        type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

      // Check if the statusParam is a valid enum value
      if (!Object.values(Status).includes(statusParam as Status)) {
        return { message: 'Invalid ticket status' };
      }

      const filterTickets = await this.prisma.tickets.findMany({
        where: {
          status: statusParam as Status,
        },
        orderBy: {
          date: 'desc',
        },
      });
      return { filterTickets, message: 'Tickets filtered successfully' };
    } catch (error) {
      return { message: 'Error filtering Tickets', error };
    }
  }
}

// async getAllTicketsofStudent(Id: StudentParams, limit: number, skip: number) {
//   try {
//     const studentTickets = await this.prisma.tickets.findMany({
//       where: {
//         studentId: Id.studentId,
//       },
//       take: limit,
//       skip: skip,
//       orderBy: {
//         ticketDate: 'desc',
//       },
//     });
//     return {
//       studentTickets,
//       message: 'Individual students tickets fetched',
//     };
//   } catch (error) {
//     return {
//       message: 'Error fetching all tickets of a particular student',
//       error,
//     };
//   }
// }
// async filterPendingTickets() {
//   try {
//     const PendingTickets = await this.prisma.tickets.findMany({
//       where: {
//         status: Status.PENDING,
//       },
//       orderBy: {
//         date: 'desc',
//       },
//     });
//     return {
//       PendingTickets,
//       messages: 'Pending tickets fetched successfully',
//     };
//   } catch (error) {
//     return { message: 'Error filtering pending tickets', error };
//   }
// }

// async filterApprovedTickets() {
//   try {
//     const ApprovedTickets = await this.prisma.tickets.findMany({
//       where: {
//         status: Status.APPROVED,
//       },
//       orderBy: {
//         date: 'desc',
//       },
//     });
//     return {
//       ApprovedTickets,
//       messages: 'Approved tickets fetched successfully',
//     };
//   } catch (error) {
//     return { message: 'Error filtering approved tickets', error };
//   }
// }
// async filterRejectedTickets() {
//   try {
//     const RejectedTickets = await this.prisma.tickets.findMany({
//       where: {
//         status: Status.REJECTED,
//       },
//       orderBy: {
//         date: 'desc',
//       },
//     });
//     return {
//       RejectedTickets,
//       messages: 'Rejected tickets fetched successfully',
//     };
//   } catch (error) {
//     return { message: 'Error fetching rejected Tickets', error };
//   }
// }
