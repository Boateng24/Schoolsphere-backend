import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from '../../db-prisma/db-prisma/db-prisma.service';
import { StudentDto, LoginDto } from 'src/Dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createStudent(student: StudentDto) {
    try {
      const userExists = await this.prisma.student.findUnique({
        where: {
          email: student.email,
        },
      });

      if (userExists) {
        throw new ConflictException('Student already exists');
      }

      const hashedPassword = await bcrypt.hash(student.password, 10);

      if (student.password !== student.confirmPassword) {
        throw new NotAcceptableException('Password Mismatch');
      }

      const newStudent = await this.prisma.student.create({
        data: {
          username: student.username,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          password: hashedPassword,
          gender: student.gender,
          role: student.role,
          guardianName: student.guardianName,
          address: {
            create: {
              GPS: student.address?.GPS,
              location: student.address?.location,
            },
          },
        },
      });

      return {
        createdStudent: newStudent,
        message: 'Student created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while creating a student',
        error.message,
      );
    }
  }

  async loginStudent({ username, password }: LoginDto) {
    try {
      const foundUser = await this.prisma.student.findFirst({
        where: {
          OR: [{ email: username }, { username }],
        },
      });
      if (!foundUser) {
        throw new NotFoundException({ message: 'Invalid Credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        throw new ConflictException({ message: 'Invalid Credentials' });
      }

      const payload = { id: foundUser.rollId, role: foundUser.role };
      const userToken = await this.jwtService.signAsync(payload);
      return {
        rollId: foundUser.rollId,
        loggedInUser: foundUser.username,
        accessToken: userToken,
        userRole: foundUser.role,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while logging in a user',
        error.message,
      );
    }
  }
}
