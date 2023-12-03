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
  @IsNotEmpty()
  ticketName: string;
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsString()
  @IsNotEmpty()
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
