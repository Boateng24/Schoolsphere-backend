import { Gender, StudentStatus, UserStatus, ROLE } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
  IsArray,
  MinLength,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';
import {
  AcademicRecordsDto,
  SchoolClassDto,
  StudentAddressDto,
  StudentTeacherDto,
  TeacherAddressDto,
} from './other-authdtos.dto';

export class StudentDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'Please confirm your password' })
  confirmPassword: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: string;

  @Matches(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    { message: 'Phone number supplied is not valid' },
  )
  @IsOptional()
  contact: string;

  @ValidateNested()
  @Type(() => StudentAddressDto)
  @IsOptional()
  address: StudentAddressDto;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(ROLE)
  @IsOptional()
  role: ROLE;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SchoolClassDto)
  @IsOptional()
  schoolClass: SchoolClassDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentTeacherDto)
  @IsOptional()
  teacher: StudentTeacherDto[];

  @IsDateString()
  @IsOptional()
  admissionDate: string;
  @IsString()
  @IsOptional()
  religion: string;
  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  guardianName: string;

  @IsString()
  @IsOptional()
  relationsToGuardian: string;

  @IsString()
  @IsOptional()
  medicalConditions: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  previousSchool: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcademicRecordsDto)
  @IsOptional()
  academicRecords: AcademicRecordsDto[];

  @IsEnum(StudentStatus)
  @IsOptional()
  status: StudentStatus;

  @IsString()
  @IsOptional()
  emergencyContact: string;

  @IsString()
  @IsOptional()
  emergencyContactName: string;
}
export class TeacherDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'Please confirm your password' })
  confirmPassword: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: string;

  @Matches(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    { message: 'Phone number supplied is not valid' },
  )
  @IsOptional()
  contact: string;

  @ValidateNested()
  @Type(() => TeacherAddressDto)
  @IsOptional()
  address: TeacherAddressDto;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(ROLE)
  @IsOptional()
  role: ROLE;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SchoolClassDto)
  @IsOptional()
  schoolClass: SchoolClassDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentTeacherDto)
  @IsOptional()
  teacher: StudentTeacherDto[];

  @IsString()
  @IsOptional()
  religion: string;
  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsOptional()
  medicalConditions: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  previousSchool: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcademicRecordsDto)
  @IsOptional()
  academicRecords: AcademicRecordsDto[];

  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @IsString()
  @IsOptional()
  emergencyContact: string;

  @IsString()
  @IsOptional()
  emergencyContactName: string;
}
export class UserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'Please confirm your password' })
  confirmPassword: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: string;

  @Matches(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    { message: 'Phone number supplied is not valid' },
  )
  @IsOptional()
  contact: string;

  @ValidateNested()
  @Type(() => TeacherAddressDto)
  @IsOptional()
  address: TeacherAddressDto;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(ROLE)
  @IsOptional()
  role: ROLE;

  @IsString()
  @IsOptional()
  religion: string;
  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsOptional()
  medicalConditions: string;

  @IsString()
  @IsOptional()
  allergies: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  previousSchool: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @IsString()
  @IsOptional()
  emergencyContact: string;

  @IsString()
  @IsOptional()
  emergencyContactName: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class StudentParams {
  @IsString()
  studentId: string;
}
