import { Injectable } from '@nestjs/common';
import { Status, TicketDto, TicketParams } from 'src/Dtos/ticket.dto';
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
    const studentFound = await this.prisma.student.findFirst({
      where: { rollId: student.studentId },
    });
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
  }

  async approveTicket(Id: TicketParams) {
    const approval = await this.prisma.tickets.update({
      where: {
        ticketId: Id.ticketId,
      },
      data: {
        ticketStatus: Status.APPROVED,
      },
    });

    return { approved: approval, message: 'Ticket Approved Successfully' };
  }

  async rejectTicket(Id: TicketParams) {
    const rejection = await this.prisma.tickets.update({
      where: {
        ticketId: Id.ticketId,
      },
      data: {
        ticketStatus: Status.REJECTED,
      },
    });

    return { rejected: rejection, message: 'Ticket Rejected' };
  }

  async getTicket(Id: TicketParams) {
    const fetchedTicket = await this.prisma.tickets.findFirst({
      where: {
        ticketId: Id.ticketId,
      },
    });
    return { fetchedTicket, message: 'Ticket Fetched Successfully' };
  }

  async getAllTickets() {
    const allTickets = await this.prisma.tickets.findMany({});
    if (!allTickets) {
      return { message: 'No tickets found' };
    }
    return { allTickets, message: 'All Tickets Fetched Successfully' };
  }

  async deleteTicket(Id: TicketParams) {
    await this.prisma.tickets.delete({
      where: {
        ticketId: Id.ticketId,
      },
    });
    return { message: 'Ticket Deleted Successfully' };
  }

  async getAllTicketsofStudent(Id: StudentParams) {
    const studentTickets = await this.prisma.tickets.findMany({
      where: {
        studentId: Id.studentId,
      },
    });
    return { studentTickets, message: 'Individual students tickets fetched' };
  }
}
