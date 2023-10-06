import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { StudentAddressDto, StudentParams } from 'src/Dtos/other-authdtos.dto';
import { StudentsService } from 'src/services/students/students.service';
import { Roles } from '../../decorators/role.decorators';
import { Role } from '../../@types/types';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/authguard.guard';

@Controller({ path: 'students', version: '1' })
@UseGuards(AuthGuard, RoleGuard)
export class StudentsController {
  constructor(private readonly studentservice: StudentsService) {}
  @Post('/studentAddress/:studentId')
  async studentAddress(
    @Body() body: StudentAddressDto,
    @Param() params: StudentParams,
  ) {
    return this.studentservice.createStudentAddress(body, params);
  }

  @Get('/allStudents')
  @Roles(Role.ADMIN)
  async findallStudents() {
    return this.studentservice.allStudents();
  }

  @Get('/:studentId')
  async findStudent(@Param() params: StudentParams) {
    return this.studentservice.getStudent(params);
  }

  @Delete('/studentAddress/:studentId')
  async deleteStudentAddress(@Param() params: StudentParams) {
    return this.studentservice.deleteStudentAddress(params);
  }

  @Patch('/studentAddress/:studentId')
  async updateStudentAddress(
    @Param() studentId: StudentParams,
    @Body() addressData: StudentAddressDto,
  ) {
    return this.studentservice.updateStudentAddress(studentId, addressData);
  }

  @Delete('/:studentId')
  async deleteStudent(@Param() params: StudentParams) {
    return this.studentservice.deleteStudent(params);
  }
}
