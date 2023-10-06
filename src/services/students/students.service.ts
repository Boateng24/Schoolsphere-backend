import {
  ConflictException,
  Injectable,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { StudentAddressDto, StudentParams } from 'src/Dtos/other-authdtos.dto';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async createStudentAddress(body: StudentAddressDto, params: StudentParams) {
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

  async getStudent(params: StudentParams) {
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
        role: true,
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

  async deleteStudentAddress(@Param() studentaddress: StudentParams) {
    await this.prisma.studentAddress.delete({
      where: {
        studentId: studentaddress.studentId,
      },
    });
    return { message: 'Student address deleted successfully' };
  }

  async updateStudentAddress(params: StudentParams, body: StudentAddressDto) {
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

  async allStudents() {
    try {
      const studentsFound = await this.prisma.student.findMany();
      return { students: studentsFound };
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error('Error fetching students from the database.');
    }
  }

  async deleteStudent(@Param() students: StudentParams) {
    try {
      await this.prisma.student.delete({
        where: {
          rollId: students.studentId,
        },
      });
      return { message: 'Student deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting a student');
    }
  }
}
