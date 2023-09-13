import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, StudentDto } from 'src/Dtos/auth.dto';

import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('/createStudent')
  async SingupStudent(@Body() body: StudentDto) {
    return this.authservice.createStudent(body);
  }

  @Post('/loginStudent')
  async loginStudent(@Body() body: LoginDto) {
    return this.authservice.loginStudent(body);
  }
}
