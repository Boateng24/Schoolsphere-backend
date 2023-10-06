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

export class StudentParams {
  @IsString()
  studentId: string;
}

export class SchoolClassDto {
  @IsNotEmpty()
  @IsEnum(ClassCategory)
  classType: ClassCategory;
  @IsNotEmpty()
  @IsEnum(ClassType)
  schoolClass: ClassType;
  @IsString()
  @IsNotEmpty()
  studentId: string;
  @IsString()
  @IsNotEmpty()
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
