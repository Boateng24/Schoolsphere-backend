-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('KINGDERGARTEN', 'PRIMARY', 'JHS');

-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('KINGDERGARTEN1', 'KINGDERGARTEN2', 'PRIMARY1', 'PRIMARY2', 'PRIMARY3', 'PRIMARY4', 'PRIMARY5', 'PRIMARY6', 'JHS1', 'JHS2', 'JHS3');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'GRADUATED', 'DROPPEDOUT');

-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('ACTIVE', 'ONLEAVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "TERM" AS ENUM ('FIRSTTERM', 'SECONDTERM', 'THIRDTERM');

-- CreateTable
CREATE TABLE "Student" (
    "rollId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "contact" TEXT,
    "gender" "Gender" NOT NULL,
    "admissionDate" TIMESTAMP(3),
    "religion" TEXT,
    "nationality" TEXT,
    "guardianName" TEXT NOT NULL,
    "relationsToGuardian" TEXT,
    "medicalConditions" TEXT,
    "allergies" TEXT,
    "photo" TEXT,
    "previousSchool" TEXT,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "emergencyContact" TEXT,
    "emergencyContactName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "employeeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "contact" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "qualification" TEXT,
    "specialization" TEXT,
    "employmentDate" TIMESTAMP(3),
    "nationality" TEXT,
    "religion" TEXT,
    "previousSchool" TEXT,
    "yearsOfExperience" INTEGER,
    "photo" TEXT,
    "status" "TeacherStatus" NOT NULL DEFAULT 'ACTIVE',
    "biography" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "emergencyContact" TEXT,
    "emergencyContactName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "StudentTeacher" (
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentTeacher_pkey" PRIMARY KEY ("studentId","teacherId")
);

-- CreateTable
CREATE TABLE "StudentAddress" (
    "GPS" TEXT,
    "location" TEXT,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAddress_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "TeacherAddress" (
    "GPS" TEXT,
    "location" TEXT,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherAddress_pkey" PRIMARY KEY ("teacherId")
);

-- CreateTable
CREATE TABLE "SchoolClass" (
    "classType" "ClassCategory" NOT NULL,
    "schoolClass" "ClassType" NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "SchoolClass_pkey" PRIMARY KEY ("studentId","teacherId")
);

-- CreateTable
CREATE TABLE "AcademicRecords" (
    "academicYear" TIMESTAMP(3) NOT NULL,
    "term" "TERM" NOT NULL,
    "courseCode" TEXT,
    "courseName" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "grades" TEXT NOT NULL,
    "studentPosition" TEXT,
    "teacherComments" TEXT[],
    "recommendations" TEXT NOT NULL,

    CONSTRAINT "AcademicRecords_pkey" PRIMARY KEY ("studentId","term","academicYear")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE INDEX "Student_firstName_lastName_email_idx" ON "Student"("firstName", "lastName", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE INDEX "Teacher_firstName_lastName_email_idx" ON "Teacher"("firstName", "lastName", "email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAddress_studentId_key" ON "StudentAddress"("studentId");

-- CreateIndex
CREATE INDEX "StudentAddress_GPS_location_idx" ON "StudentAddress"("GPS", "location");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAddress_teacherId_key" ON "TeacherAddress"("teacherId");

-- CreateIndex
CREATE INDEX "TeacherAddress_GPS_location_idx" ON "TeacherAddress"("GPS", "location");

-- CreateIndex
CREATE INDEX "SchoolClass_classType_schoolClass_idx" ON "SchoolClass"("classType", "schoolClass");

-- CreateIndex
CREATE INDEX "AcademicRecords_term_courseName_idx" ON "AcademicRecords"("term", "courseName");

-- AddForeignKey
ALTER TABLE "StudentTeacher" ADD CONSTRAINT "StudentTeacher_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTeacher" ADD CONSTRAINT "StudentTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAddress" ADD CONSTRAINT "StudentAddress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAddress" ADD CONSTRAINT "TeacherAddress_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolClass" ADD CONSTRAINT "SchoolClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolClass" ADD CONSTRAINT "SchoolClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicRecords" ADD CONSTRAINT "AcademicRecords_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicRecords" ADD CONSTRAINT "AcademicRecords_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE RESTRICT ON UPDATE CASCADE;
