import { IsString, IsDate, IsNumber } from 'class-validator';

export enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export class TicketDto {
  @IsString()
  ticketName: string;
  @IsString()
  reason: string;
  @IsString()
  ticketItem: string;
  @IsDate()
  ticketDate: Date;
}

export class TicketParams {
  @IsNumber()
  ticketId: number;
}
