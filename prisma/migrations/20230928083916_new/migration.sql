/*
  Warnings:

  - The values [KINGDERGARTEN,PRIMARY,JHS] on the enum `ClassCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [KINGDERGARTEN1,KINGDERGARTEN2,PRIMARY1,PRIMARY2,PRIMARY3,PRIMARY4,PRIMARY5,PRIMARY6,JHS1,JHS2,JHS3] on the enum `ClassType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE,OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [STUDENT,TEACHER,HEADMASTER,PROPRIETOR,ADMIN,OTHER] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,GRADUATED,DROPPEDOUT] on the enum `StudentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FIRSTTERM,SECONDTERM,THIRDTERM] on the enum `TERM` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,ONLEAVE,RETIRED] on the enum `TeacherStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClassCategory_new" AS ENUM ('kindergarten', 'primary', 'jhs');
ALTER TABLE "SchoolClass" ALTER COLUMN "classType" TYPE "ClassCategory_new" USING ("classType"::text::"ClassCategory_new");
ALTER TYPE "ClassCategory" RENAME TO "ClassCategory_old";
ALTER TYPE "ClassCategory_new" RENAME TO "ClassCategory";
DROP TYPE "ClassCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ClassType_new" AS ENUM ('kindergarten1', 'kindergarten2', 'primary1', 'primary2', 'primary3', 'primary4', 'primary5', 'primary6', 'jhs1', 'jhs2', 'jhs3');
ALTER TABLE "SchoolClass" ALTER COLUMN "schoolClass" TYPE "ClassType_new" USING ("schoolClass"::text::"ClassType_new");
ALTER TYPE "ClassType" RENAME TO "ClassType_old";
ALTER TYPE "ClassType_new" RENAME TO "ClassType";
DROP TYPE "ClassType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('male', 'female');
ALTER TABLE "Student" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TABLE "Teacher" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('student', 'teacher', 'headmaster', 'proprietro', 'admin', 'nonteaching');
ALTER TABLE "Teacher" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Student" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Student" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TABLE "Teacher" ALTER COLUMN "role" TYPE "ROLE_new" USING ("role"::text::"ROLE_new");
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "ROLE_old";
ALTER TABLE "Teacher" ALTER COLUMN "role" SET DEFAULT 'teacher';
ALTER TABLE "Student" ALTER COLUMN "role" SET DEFAULT 'student';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StudentStatus_new" AS ENUM ('active', 'graduated', 'droppedout', 'deactivated');
ALTER TABLE "Student" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Student" ALTER COLUMN "status" TYPE "StudentStatus_new" USING ("status"::text::"StudentStatus_new");
ALTER TYPE "StudentStatus" RENAME TO "StudentStatus_old";
ALTER TYPE "StudentStatus_new" RENAME TO "StudentStatus";
DROP TYPE "StudentStatus_old";
ALTER TABLE "Student" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TERM_new" AS ENUM ('firstterm', 'secondterm', 'thirdterm');
ALTER TABLE "AcademicRecords" ALTER COLUMN "term" TYPE "TERM_new" USING ("term"::text::"TERM_new");
ALTER TYPE "TERM" RENAME TO "TERM_old";
ALTER TYPE "TERM_new" RENAME TO "TERM";
DROP TYPE "TERM_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TeacherStatus_new" AS ENUM ('active', 'onleave', 'retired');
ALTER TABLE "Teacher" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Teacher" ALTER COLUMN "status" TYPE "TeacherStatus_new" USING ("status"::text::"TeacherStatus_new");
ALTER TYPE "TeacherStatus" RENAME TO "TeacherStatus_old";
ALTER TYPE "TeacherStatus_new" RENAME TO "TeacherStatus";
DROP TYPE "TeacherStatus_old";
ALTER TABLE "Teacher" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "role" SET DEFAULT 'student';

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "role" SET DEFAULT 'teacher';
