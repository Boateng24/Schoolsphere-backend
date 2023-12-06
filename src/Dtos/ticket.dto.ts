import {
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export enum Status {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export class TicketDto {
  @IsString()
  @IsNotEmpty({ message: 'Ticket name is required' })
  ticketName: string;
  @IsString()
  @IsNotEmpty({ message: 'Reason for ticket is required' })
  reason: string;
  @IsString()
  @IsNotEmpty({ message: 'Ticket item is required' })
  ticketItem: string;
  @IsDate()
  @IsOptional()
  ticketDate: Date;
}

export class TicketParams {
  @IsNumber()
  ticketId: number;
}

export class TicketUpdateDto {
  @IsString()
  @IsOptional()
  ticketName: string;
  @IsString()
  @IsOptional()
  reason: string;
  @IsString()
  @IsOptional()
  ticketItem: string;
  @IsDate()
  @IsOptional()
  ticketDate: Date;
}
