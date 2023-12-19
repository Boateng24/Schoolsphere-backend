import { ClassCategory, ClassType, TERM } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsArray,
} from 'class-validator';

export class StudentAddressDto {
  @IsString()
  @IsOptional()
  GPS?: string;

  @IsString()
  @IsOptional()
  location?: string;
}

export class TeacherAddressDto {
  @IsString()
  @IsOptional()
  GPS?: string;

  @IsString()
  @IsOptional()
  location?: string;
}

export class StudentParams {
  @IsString()
  @IsOptional()
  studentId: string;
}
export class TeacherParams {
  @IsString()
  @IsOptional()
  teacherId: string;
}
export class UserParams {
  @IsString()
  @IsOptional()
  userId: string;
}

export enum RequesterType {
  Student = 'student',
  Teacher = 'teacher',
  Other = 'other',
}

export class SchoolClassDto {
  @IsNotEmpty({ message: 'Class type is required' })
  @IsEnum(ClassCategory)
  classType: ClassCategory;
  @IsNotEmpty({ message: 'School class is required' })
  @IsEnum(ClassType)
  schoolClass: ClassType;
  @IsString()
  @IsNotEmpty({ message: 'Student ID is required' })
  studentId: string;
  @IsString()
  @IsNotEmpty({ message: 'Teacher ID is required' })
  teacherId: string;
}

export class StudentTeacherDto {
  @IsString()
  studentId: string;
  @IsString()
  teacherId: string;
}

export class AcademicRecordsDto {
  @IsDateString()
  academicYear: string;
  @IsEnum(TERM)
  term: TERM;
  @IsString()
  courseCode: string;
  @IsString()
  courseName: string;
  @IsString()
  teacherId: string;
  @IsString()
  studentId: string;
  @IsString()
  grades: string;
  @IsString()
  studentPosition: string;
  @IsArray()
  @IsString({ each: true })
  teacherComments: string[];
  @IsString()
  recommendations: string;
}
