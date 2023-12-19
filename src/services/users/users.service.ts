import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db-prisma/db-prisma/db-prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async allUsers() {
    const findAllUsers = await this.prisma.$transaction([
      this.prisma.student.findMany(),
      this.prisma.teacher.findMany(),
      this.prisma.user.findMany(),
    ]);
    return [...findAllUsers[0], ...findAllUsers[1], ...findAllUsers[2]];
  }
}
