import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Status,
  TicketDto,
  TicketParams,
  TicketUpdateDto,
} from 'src/Dtos/ticket.dto';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';
import { StudentParams } from 'src/Dtos/other-authdtos.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TicketService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}
  async createTicket(ticket: TicketDto, student: StudentParams) {
    try {
      const studentFound = await this.prisma.student.findFirst({
        where: { rollId: student.studentId },
      });
      if (!studentFound) {
        throw new NotFoundException('User not found');
      }
      const newTicket = await this.prisma.tickets.create({
        data: {
          ...ticket,
          ticketStatus: Status.PENDING,
          studentId: student.studentId,
        },
      });

      const content = `A ticket raised by ${studentFound.firstName} is pending for your approval`;
      const todo = await this.notify.notifyApprovers(content);
      console.log(todo);
      return {
        ticketRaised: newTicket,
        notice: todo,
        message: 'Ticket Raised Successfully',
      };
    } catch (error) {
      return { message: 'Error creating a ticket', error };
    }
  }

  async approveTicket(Id: TicketParams) {
    try {
      const approval = await this.prisma.tickets.update({
        where: {
          ticketId: Id.ticketId,
        },
        data: {
          ticketStatus: Status.APPROVED,
        },
      });
      return { approved: approval, message: 'Ticket Approved Successfully' };
    } catch (error) {
      return { message: 'Error approving a ticket', error };
    }
  }

  async rejectTicket(Id: TicketParams) {
    try {
      const rejection = await this.prisma.tickets.update({
        where: {
          ticketId: Id.ticketId,
        },
        data: {
          ticketStatus: Status.REJECTED,
        },
      });

      return { rejected: rejection, message: 'Ticket Rejected' };
    } catch (error) {
      return { message: 'Error rejecting a ticket', error };
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
    } catch (error) {
      return { message: 'Error fetching a ticket', error };
    }
  }

  async getAllTickets(limit: number, skip: number) {
    try {
      const allTickets = await this.prisma.tickets.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          ticketDate: 'desc',
        },
      });
      if (allTickets.length === 0) {
        return { message: 'No tickets found' };
      }
      return { allTickets, message: 'All Tickets Fetched Successfully' };
    } catch (error) {
      return { message: 'Error fetching all tickets', error };
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
    } catch (error) {
      return { message: 'Error deleting a ticket', error };
    }
  }

  async getAllTicketsofStudent(Id: StudentParams, limit: number, skip: number) {
    try {
      const studentTickets = await this.prisma.tickets.findMany({
        where: {
          studentId: Id.studentId,
        },
        take: limit,
        skip: skip,
        orderBy: {
          ticketDate: 'desc',
        },
      });
      return {
        studentTickets,
        message: 'Individual students tickets fetched',
      };
    } catch (error) {
      return {
        message: 'Error fetching all tickets of a particular student',
        error,
      };
    }
  }

  async allTicketDelete() {
    try {
      await this.prisma.tickets.deleteMany();
      return { message: 'All tickets deleted' };
    } catch (error) {
      return { message: 'Error deleting all tickets', error };
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
    } catch (error) {
      return { message: 'Error updating Tickets', error };
    }
  }

  async filterPendingTickets() {
    try {
      const PendingTickets = await this.prisma.tickets.findMany({
        where: {
          ticketStatus: Status.PENDING,
        },
        orderBy: {
          ticketDate: 'desc',
        },
      });
      return {
        PendingTickets,
        messages: 'Pending tickets fetched successfully',
      };
    } catch (error) {
      return { message: 'Error filtering pending tickets', error };
    }
  }

  async filterApprovedTickets() {
    try {
      const ApprovedTickets = await this.prisma.tickets.findMany({
        where: {
          ticketStatus: Status.APPROVED,
        },
        orderBy: {
          ticketDate: 'desc',
        },
      });
      return {
        ApprovedTickets,
        messages: 'Approved tickets fetched successfully',
      };
    } catch (error) {
      return { message: 'Error filtering approved tickets', error };
    }
  }
  async filterRejectedTickets() {
    try {
      const RejectedTickets = await this.prisma.tickets.findMany({
        where: {
          ticketStatus: Status.REJECTED,
        },
        orderBy: {
          ticketDate: 'desc',
        },
      });
      return {
        RejectedTickets,
        messages: 'Rejected tickets fetched successfully',
      };
    } catch (error) {
      return { message: 'Error fetching rejected Tickets', error };
    }
  }

  async searchTicketsByName(query: string) {
    try {
      const searchedTicket = await this.prisma.tickets.findMany({
        where: {
          ticketName: { contains: query, mode: 'insensitive' },
        },
      });
      return { searchedTicket, message: 'Ticket successfully searched' };
    } catch (error) {
      return { message: 'Error Searching for a Ticket', error };
    }
  }
}
