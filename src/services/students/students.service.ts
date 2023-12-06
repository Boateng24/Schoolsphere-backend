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
    try {
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
      return {
        createdStdAddress: newstudentAddress,
        message: 'Student Address created successfully',
      };
    } catch (error) {
      return { message: 'Error creating student address', error };
    }
  }

  async getStudent(params: StudentParams) {
    try {
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
      return { findStudent, message: 'Student found successfully' };
    } catch (error) {
      return { message: 'Error getting student', error };
    }
  }

  async deleteStudentAddress(@Param() studentaddress: StudentParams) {
    try {
      await this.prisma.studentAddress.delete({
        where: {
          studentId: studentaddress.studentId,
        },
      });
      return { message: 'Student address deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting student address', error };
    }
  }

  async updateStudentAddress(params: StudentParams, body: StudentAddressDto) {
    try {
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
    } catch (error) {
      return { message: 'Error updating student Address', error };
    }
  }

  async allStudents() {
    try {
      const studentsFound = await this.prisma.student.findMany({
        orderBy: {
          firstName: 'asc',
        },
      });
      return { students: studentsFound, message: 'All students fetched' };
    } catch (error) {
      return { message: 'Error finding all students', error };
    }
  }

  async deleteStudent(students: StudentParams) {
    try {
      const checkStudentExist = await this.prisma.student.findFirst({
        where: {
          rollId: students.studentId,
        },
      });
      if (!checkStudentExist) {
        return { error: 'Student being deleted does not exist' };
      }

      const checkAdmin = await this.prisma.student.findFirst({
        where: {
          role: 'admin',
        },
      });
      if (checkAdmin) {
        return { error: 'Super admin cannot be deleted from the system' };
      }

      await this.prisma.student.delete({
        where: {
          rollId: students.studentId,
        },
      });
      return { message: 'Student deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting a student', error };
    }
  }

  async searchStudent(query: string) {
    try {
      const studentSearch = await this.prisma.student.findMany({
        where: {
          OR: [
            { firstName: { startsWith: query, mode: 'insensitive' } },
            { lastName: { startsWith: query, mode: 'insensitive' } },
            { middleName: { startsWith: query, mode: 'insensitive' } },
          ],
        },
      });
      return { studentSearch, message: 'Students queried successfully' };
    } catch (error) {
      return { message: 'Error searching for student', error };
    }
  }
}
