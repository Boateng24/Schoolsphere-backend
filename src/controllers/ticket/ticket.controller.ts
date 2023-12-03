import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from 'src/services/ticket/ticket.service';
import { TicketDto, TicketParams, TicketUpdateDto } from 'src/Dtos/ticket.dto';
import { StudentParams } from 'src/Dtos/other-authdtos.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/authguard.guard';
import { Roles } from '../../decorators/role.decorators';
import { Role } from '../../@types/types';

@Controller({ path: 'ticket', version: '1' })
@UseGuards(AuthGuard, RoleGuard)
export class TicketController {
  constructor(private readonly ticketservice: TicketService) {}

  @Get('/allTickets')
  @Roles(Role.ADMIN)
  async fetchAllTickets() {
    return this.ticketservice.getAllTickets();
  }

  @Post('/:studentId')
  async createTicket(@Body() body: TicketDto, @Param() params: StudentParams) {
    return this.ticketservice.createTicket(body, params);
  }

  @Get('/:ticketId')
  async fetchTicket(@Param() params: TicketParams) {
    return this.ticketservice.getTicket(params);
  }

  @Post('/approval/:ticketId')
  async ticketApproval(@Param() params: TicketParams) {
    return this.ticketservice.approveTicket(params);
  }

  @Post('/rejection/:ticketId')
  async ticketRejection(@Param() params: TicketParams) {
    return this.ticketservice.rejectTicket(params);
  }
  @Delete('/tickets')
  async ticketsDelete() {
    return this.ticketservice.allTicketDelete();
  }

  @Delete('/:ticketId')
  async deleteTicket(@Param() params: TicketParams) {
    return this.ticketservice.deleteTicket(params);
  }

  @Get('/tickets/:studentId')
  async getStudentTickets(@Param() params: StudentParams) {
    return this.ticketservice.getAllTicketsofStudent(params);
  }

  @Patch('/:ticketId')
  async updateTicket(
    @Body() ticket: TicketUpdateDto,
    @Param() params: TicketParams,
  ) {
    return this.ticketservice.updateTicket(ticket, params);
  }
}
