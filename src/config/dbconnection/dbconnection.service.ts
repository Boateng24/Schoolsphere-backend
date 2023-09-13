import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';

@Injectable()
export class DbconnectionService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(DbconnectionService.name);

  async connection() {
    try {
      await this.prisma.$connect().then(() => {
        this.logger.log('Database connected successfully');
      });
    } catch (error) {
      this.logger.log(error);
    }
  }
}
