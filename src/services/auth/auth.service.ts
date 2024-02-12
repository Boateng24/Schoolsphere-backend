import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from '../../db-prisma/db-prisma/db-prisma.service';
import { StudentDto, LoginDto, TeacherDto, UserDto } from 'src/Dtos/auth.dto';
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

      const { password, ...studentData } = newStudent;
      return {
        createdStudent: studentData,
        message: 'Student created successfully',
      };
    } catch ({ response }) {
      throw new InternalServerErrorException(
        'An error occured while creating a student',
        response,
      );
    }
  }
  async createTeacher(teacher: TeacherDto) {
    try {
      const userExists = await this.prisma.teacher.findUnique({
        where: {
          email: teacher.email,
        },
      });

      if (userExists) {
        throw new ConflictException('Teacher already exists');
      }

      const hashedPassword = await bcrypt.hash(teacher.password, 10);

      if (teacher.password !== teacher.confirmPassword) {
        throw new NotAcceptableException('Password Mismatch');
      }

      const newTeacher = await this.prisma.teacher.create({
        data: {
          username: teacher.username,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          password: hashedPassword,
          gender: teacher.gender,
          role: teacher.role,
          address: {
            create: {
              GPS: teacher.address?.GPS,
              location: teacher.address?.location,
            },
          },
        },
      });

      const { password, ...TeacherData } = newTeacher;
      return {
        createdTeacher: TeacherData,
        message: 'Teacher created successfully',
      };
    } catch ({ response }) {
      throw new InternalServerErrorException(
        'An error occured while creating a teacher',
        response,
      );
    }
  }
  async createUser(user: UserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExists) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      if (user.password !== user.confirmPassword) {
        throw new NotAcceptableException('Password Mismatch');
      }

      const newUser = await this.prisma.user.create({
        data: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hashedPassword,
          gender: user.gender,
          role: user.role,
          address: {
            create: {
              GPS: user.address?.GPS,
              location: user.address?.location,
            },
          },
        },
      });

      const { password, ...userData } = newUser;
      return {
        createdUser: userData,
        message: 'User created successfully',
      };
    } catch ({ response }) {
      throw new InternalServerErrorException(
        'An error occured while creating a user',
        response,
      );
    }
  }
  async login({ username, password }: LoginDto) {
    try {
      let foundUser: any;
      let role: any;
      let idField: any;

      // Check in students
      foundUser = await this.prisma.student.findFirst({
        where: {
          OR: [{ email: username }, { username }],
        },
      });
      if (foundUser) {
        role = foundUser.role;
        idField = 'rollId';
      }

      // Check in teachers if not found in students
      if (!foundUser) {
        foundUser = await this.prisma.teacher.findFirst({
          where: {
            OR: [{ email: username }, { username }],
          },
        });
        if (foundUser) {
          role = foundUser.role;
          idField = 'employeeId';
        }
      }

      // Check in general users if not found in teachers
      if (!foundUser) {
        foundUser = await this.prisma.user.findFirst({
          where: {
            OR: [{ email: username }, { username }],
          },
        });
        if (foundUser) {
          role = foundUser.role;
          idField = 'userId'; // Assuming 'userId' is the identifier in the user table
        }
      }

      // User not found in any table
      if (!foundUser) {
        throw new NotFoundException({ message: 'Invalid Credentials' });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        throw new ConflictException({ message: 'Invalid Credentials' });
      }

      // Create JWT payload
      const payload = { id: foundUser[idField], role: role };
      const userToken = await this.jwtService.signAsync(payload);

      return {
        userId: foundUser[idField],
        loggedInUser: foundUser.username,
        accessToken: userToken,
        userRole: role,
      };
    } catch ({ response }) {
      throw new InternalServerErrorException(
        'An error occurred while logging in a user',
        response,
      );
    }
  }
}
