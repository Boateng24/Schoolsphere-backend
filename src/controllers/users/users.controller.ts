import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @Get('/allUsers')
  async allUsers() {
    return await this.userservice.allUsers();
  }
}
