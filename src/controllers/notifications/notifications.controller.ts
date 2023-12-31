import { Controller, Get } from '@nestjs/common';
import { NotificationService } from 'src/services/notification/notification.service';

@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notifications: NotificationService) {}

  @Get('/allnotifications')
  async getAllNotifications() {
    return this.notifications.fetchAllNotifications();
  }
}
