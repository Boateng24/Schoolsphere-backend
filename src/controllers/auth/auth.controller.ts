import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, StudentDto, TeacherDto, UserDto } from 'src/Dtos/auth.dto';

import { AuthService } from 'src/services/auth/auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('/createStudent')
  async SingupStudent(@Body() body: StudentDto) {
    return await this.authservice.createStudent(body);
  }
  @Post('/createUser')
  async SingupUser(@Body() body: UserDto) {
    return await this.authservice.createUser(body);
  }
  @Post('/createTeacher')
  async SingupTeacher(@Body() body: TeacherDto) {
    return await this.authservice.createTeacher(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authservice.login(body);
  }
}
