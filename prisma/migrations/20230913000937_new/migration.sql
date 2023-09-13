/*
  Warnings:

  - Added the required column `username` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('STUDENT', 'TEACHER', 'HEADMASTER', 'PROPRIETOR', 'ADMIN', 'OTHER');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'TEACHER',
ADD COLUMN     "username" TEXT NOT NULL;
