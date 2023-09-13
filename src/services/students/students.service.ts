import {
  ConflictException,
  Injectable,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  StudentAddressDto,
  StudentAddressParams,
} from 'src/Dtos/other-authdtos.dto';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async createStudentAddress(
    body: StudentAddressDto,
    params: StudentAddressParams,
  ) {
    const addressExists = await this.prisma.studentAddress.findFirst({
      where: {
        studentId: params.studentId,
      },
    });
    if (addressExists) {
      throw new ConflictException('Student address exists');
    }
    const newstudentAddress = await this.prisma.studentAddress.create({
      data: {
        GPS: body.GPS,
        location: body.location,
        studentId: params.studentId,
      },
    });
    return { createdStdAddress: newstudentAddress };
  }

  async getStudent(params: StudentAddressParams) {
    const findStudent = await this.prisma.student.findFirst({
      where: {
        rollId: params.studentId,
      },
      select: {
        rollId: true,
        username: true,
        firstName: true,
        lastName: true,
        middleName: true,
        email: true,
        contact: true,
        gender: true,
        address: true,
        dateOfBirth: true,
        guardianName: true,
        teacher: true,
        schoolClass: true,
        academicRecords: true,
        admissionDate: true,
        nationality: true,
        allergies: true,
        emergencyContact: true,
        emergencyContactName: true,
        medicalConditions: true,
        password: true,
        photo: true,
        previousSchool: true,
        relationsToGuardian: true,
        religion: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { findStudent };
  }

  async deleteStudent(@Param() studentaddress: StudentAddressParams) {
    await this.prisma.studentAddress.delete({
      where: {
        studentId: studentaddress.studentId,
      },
    });
    return { message: 'Student address deleted successfully' };
  }

  async updateStudentAddress(
    params: StudentAddressParams,
    body: StudentAddressDto,
  ) {
    const addressExists = await this.prisma.studentAddress.findFirst({
      where: {
        studentId: params.studentId,
      },
    });

    if (!addressExists) {
      throw new NotFoundException('Student address not found');
    }
    await this.prisma.studentAddress.update({
      where: {
        studentId: params.studentId,
      },
      data: {
        GPS: body.GPS,
        location: body.location,
      },
    });
    return { message: 'Student address updated successfully' };
  }
}
