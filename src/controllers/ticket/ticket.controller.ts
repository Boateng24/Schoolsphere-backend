import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TicketService } from 'src/services/ticket/ticket.service';
import { TicketDto, TicketParams, TicketUpdateDto } from 'src/Dtos/ticket.dto';
import { StudentParams } from 'src/Dtos/other-authdtos.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/authguard.guard';
import { Roles } from '../../decorators/role.decorators';
import { Role } from '../../@types/types';
import { Status } from '@prisma/client';

@Controller({ path: 'ticket', version: '1' })
@UseGuards(AuthGuard, RoleGuard)
export class TicketController {
  constructor(private readonly ticketservice: TicketService) {}

  @Get('/allTickets')
  @Roles(Role.ADMIN)
  async fetchAllTickets(
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() response,
  ) {
    try {
      const defaultPage = 1;
      const defaultSize = 10;

      page = page || defaultPage;
      size = size || defaultSize;

      const limit = parseInt(size as any, 10);
      const skip = (page - 1) * limit;
      const alltickets = this.ticketservice.getAllTickets(limit, skip);
      return response
        .status(HttpStatus.OK)
        .json({ page, size, data: alltickets });
    } catch (error) {
      throw new HttpException(
        'Error fetching courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  @Get('/name/ticketbyname')
  async searchTicketByName(@Query('ticketname') ticketname: string) {
    return this.ticketservice.searchTicketsByName(ticketname);
  }

  @Get('/pending/pendingTickets')
  async pendingTicket() {
    return this.ticketservice.filterPendingTickets();
  }

  @Get('/approved/approvedTickets')
  async approvedTicket() {
    return this.ticketservice.filterApprovedTickets();
  }

  @Get('/rejected/rejectedTickets')
  async rejectedTicket() {
    return this.ticketservice.filterRejectedTickets();
  }
}
