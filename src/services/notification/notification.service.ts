import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';
import { RequesterType } from 'src/Dtos/other-authdtos.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async notifyApprovers(
    content: string,
    link_to_action: string,
    requesterId: string,
    requesterType: RequesterType,
  ): Promise<object> {
    try {
      const approvers = await this.prisma.user.findMany({
        where: {
          role: 'admin',
        },
      });
      console.log(approvers.length);
      for (const _approver of approvers) {
        const notificationData: any = {
          content: content,
          link_to_action: link_to_action,
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
        console.log('created');
      }

      return { content, link_to_action };
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
}
