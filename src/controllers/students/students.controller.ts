import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  StudentAddressDto,
  StudentAddressParams,
} from 'src/Dtos/other-authdtos.dto';
import { StudentsService } from 'src/services/students/students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentservice: StudentsService) {}
  @Post('/studentAddress/:studentId')
  async studentAddress(
    @Body() body: StudentAddressDto,
    @Param() params: StudentAddressParams,
  ) {
    return this.studentservice.createStudentAddress(body, params);
  }

  @Get('/:studentId')
  async findStudent(@Param() params: StudentAddressParams) {
    return this.studentservice.getStudent(params);
  }

  @Delete('/studentAddress/:studentId')
  async deleteStudent(@Param() params: StudentAddressParams) {
    return this.studentservice.deleteStudent(params);
  }

  @Patch('/studentAddress/:studentId')
  async updateStudentAddress(
    @Param() studentId: StudentAddressParams,
    @Body() addressData: StudentAddressDto,
  ) {
    return this.studentservice.updateStudentAddress(studentId, addressData);
  }
}
