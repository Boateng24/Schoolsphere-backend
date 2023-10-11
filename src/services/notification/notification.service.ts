import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async notifyApprovers(content: string): Promise<string> {
    const approvers = await this.prisma.teacher.findMany({
      where: {
        role: 'admin',
      },
    });

    for (const approver of approvers) {
      await this.prisma.notification.create({
        data: {
          content: content,
          userId: approver.employeeId,
        },
      });
    }
    return content;
  }
}
