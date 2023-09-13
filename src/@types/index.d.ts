import { ClassCategory, ClassType } from '@prisma/client';

export interface StudentAddressType {
  GPS?: string;
  location?: string;
  studentId: string;
}

export interface TeacherAddressType {
  GPS?: string;
  location?: string;
  teacherId: string;
}

export interface SchoolClassType {
  classType: ClassCategory;
  schoolClass: ClassType;
  studentId: string;
  teacherId: string;
}
