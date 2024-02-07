import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';
import { RequesterType } from 'src/Dtos/other-authdtos.dto';
import { TicketParams } from 'src/Dtos/ticket.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async notifyApprovers(
    content: string,
    requesterId: string,
    requesterType: RequesterType,
    ticketId: number,
  ): Promise<object> {
    try {
      await this.prisma.user.findFirst({
        where: {
          role: 'admin',
        },
      });
      const notificationData: any = {
        content: content,
      };

      // Attach the correct requester ID to the notification data
      if (requesterType === RequesterType.Student) {
        notificationData.studentId = requesterId;
      } else if (requesterType === RequesterType.Teacher) {
        notificationData.teacherId = requesterId;
      } else if (requesterType === RequesterType.Other) {
        notificationData.userId = requesterId;
      }

      await this.prisma.notification.create({
        data: notificationData,
      });
      return { content, requesterId, requesterType, ticketId };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while creating a notice',
        error.message,
      );
    }
  }

  async fetchAllNotifications() {
    try {
      const allNotice = await this.prisma.notification.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { allnotice: allNotice, message: 'All notification fetched' };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while fetching all notice',
        error.message,
      );
    }
  }
  async GetNotification(Id: number) {
    try {
      const notifications = await this.prisma.notification.findFirst({
        where: {
          ticketId: Id,
        },
      });
      console.log(notifications);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while fetching all notice',
        error.message,
      );
    }
  }
}
