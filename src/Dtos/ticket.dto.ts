import {
  IsString,
  IsDate,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class TicketDto {
  @IsString()
  @IsNotEmpty({ message: 'Ticket name is required' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'Reason for ticket is required' })
  reason: string;
  @IsString()
  @IsNotEmpty({ message: 'Ticket item is required' })
  item: string;
  @IsDate()
  @IsOptional()
  date: Date;
}

export class studentId {
  @IsString()
  studentId?: string;
}

export class teacherId {
  @IsString()
  teacherId?: string;
}

export class userId {
  @IsString()
  userId?: string;
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
