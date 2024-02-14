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
import {
  StudentParams,
  TeacherParams,
  UserParams,
} from 'src/Dtos/other-authdtos.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/authguard.guard';
import { Roles } from '../../decorators/role.decorators';
import { Role } from '../../@types/types';
import { Status } from 'src/Dtos/ticket.dto';

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
      const alltickets = await this.ticketservice.getAllTickets(limit, skip);
      return response
        .status(HttpStatus.OK)
        .json({ page, size, data: alltickets });
    } catch (error) {
      throw new HttpException(
        'Error fetching all tickets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/:id')
  async createTicket(
    @Body() body: TicketDto,
    @Param('id') studentId: string,
    @Param('id') teacherId: string,
    @Param('id') userId: string,
  ) {
    return await this.ticketservice.createTicket(
      body,
      studentId,
      teacherId,
      userId,
    );
  }

  @Get('/:ticketId')
  async fetchTicket(@Param() params: TicketParams) {
    return await this.ticketservice.getTicket(params);
  }

  @Post('/approval/:ticketId')
  async ticketApproval(@Param() params: TicketParams) {
    return await this.ticketservice.approveTicket(params);
  }

  @Post('/rejection/:ticketId')
  async ticketRejection(@Param() params: TicketParams) {
    return await this.ticketservice.rejectTicket(params);
  }
  @Delete('/tickets')
  async ticketsDelete() {
    return await this.ticketservice.allTicketDelete();
  }

  @Delete('/:ticketId')
  async deleteTicket(@Param() params: TicketParams) {
    return await this.ticketservice.deleteTicket(params);
  }

  @Get('/tickets/:studentId/')
  async getStudentTickets(
    @Param('studentId') studentId: StudentParams,
    @Query('status') status: Status,
    // @Query('page') page: number,
    // @Query('size') size: number,
    @Query('name') name: string,
    @Res() response,
  ) {
    try {
      // const defaultPage = 1;
      // const defaultSize = 10;

      // page = page || defaultPage;
      // size = size || defaultSize;

      // const limit = parseInt(size as any, 10);
      // const skip = (page - 1) * limit;
      const studentTicket = await this.ticketservice.getAllTicketsofStudent(
        studentId,
        status,
        name,
        // limit,
        // skip,
      );
      return response.status(HttpStatus.OK).json({ data: studentTicket });
    } catch (error) {
      throw new HttpException(
        'Error fetching all tickets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:ticketId')
  async updateTicket(
    @Body() ticket: TicketUpdateDto,
    @Param() params: TicketParams,
  ) {
    return this.ticketservice.updateTicket(ticket, params);
  }

  // @Get('/name/ticketbyname')
  // async searchTicketByName(@Query('ticketname') ticketname: string) {
  //   return this.ticketservice.searchTicketsByName(ticketname);
  // }

  // @Get('/pending/pendingTickets')
  // async pendingTicket() {
  //   return this.ticketservice.filterPendingTickets();
  // }

  // @Get('/approved/approvedTickets')
  // async approvedTicket() {
  //   return this.ticketservice.filterApprovedTickets();
  // }

  // @Get('/rejected/rejectedTickets')
  // async rejectedTicket() {
  //   return this.ticketservice.filterRejectedTickets();
  // }

  // @Get('/filterTickets/:type')
  // async filterTickets(@Param('type') type: string) {
  //   return this.ticketservice.filterTickets(type);
  // }
}
