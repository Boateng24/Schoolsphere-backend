import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

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
