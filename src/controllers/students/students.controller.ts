import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StudentAddressDto, StudentParams } from 'src/Dtos/other-authdtos.dto';
import { StudentsService } from 'src/services/students/students.service';
import { Roles } from '../../decorators/role.decorators';
import { Role } from '../../@types/types';
// import { RoleGuard } from 'src/guards/role.guard';
// import { AuthGuard } from 'src/guards/authguard.guard';

@Controller({ path: 'students', version: '1' })
// @UseGuards(AuthGuard, RoleGuard)
export class StudentsController {
  constructor(private readonly studentservice: StudentsService) {}
  @Post('/studentAddress/:studentId')
  async studentAddress(
    @Body() body: StudentAddressDto,
    @Param() params: StudentParams,
  ) {
    return await this.studentservice.createStudentAddress(body, params);
  }

  @Get('/allStudents')
  // @Roles(Role.ADMIN)
  async findallStudents() {
    return await this.studentservice.allStudents();
  }

  @Get('/querystudent')
  async searchStudent(@Query('name') name: string) {
    return await this.studentservice.searchStudent(name);
  }

  @Get('/:studentId')
  async findStudent(@Param() params: StudentParams) {
    return await this.studentservice.getStudent(params);
  }

  @Delete('/studentAddress/:studentId')
  async deleteStudentAddress(@Param() params: StudentParams) {
    return await this.studentservice.deleteStudentAddress(params);
  }

  @Patch('/studentAddress/:studentId')
  async updateStudentAddress(
    @Param() studentId: StudentParams,
    @Body() addressData: StudentAddressDto,
  ) {
    return await this.studentservice.updateStudentAddress(
      studentId,
      addressData,
    );
  }

  @Delete('/:studentId')
  async deleteStudent(@Param() params: StudentParams) {
    return await this.studentservice.deleteStudent(params);
  }
}
