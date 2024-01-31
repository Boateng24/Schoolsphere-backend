-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('kindergarten', 'primary', 'jhs');

-- CreateEnum
CREATE TYPE "Modules" AS ENUM ('Home', 'Dashboard', 'Students', 'Teachers', 'Parents', 'Library', 'Competitions', 'Configurations');

-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('kindergarten1', 'kindergarten2', 'primary1', 'primary2', 'primary3', 'primary4', 'primary5', 'primary6', 'jhs1', 'jhs2', 'jhs3');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('active', 'graduated', 'droppedout', 'deactivated');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'onleave', 'retired');

-- CreateEnum
CREATE TYPE "TERM" AS ENUM ('firstterm', 'secondterm', 'thirdterm');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('student', 'teacher', 'headmaster', 'proprietor', 'admin', 'nonteaching');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "Student" (
    "rollId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
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
    "guardianNumber" TEXT,
    "relationsToGuardian" TEXT,
    "medicalConditions" TEXT,
    "allergies" TEXT,
    "photo" TEXT,
    "previousSchool" TEXT,
    "status" "StudentStatus" NOT NULL DEFAULT 'active',
    "role" "ROLE" NOT NULL DEFAULT 'student',
    "emergencyContact" TEXT,
    "emergencyContactName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "employeeId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "contact" TEXT,
    "gender" "Gender" NOT NULL,
    "qualification" TEXT,
    "specialization" TEXT,
    "employmentDate" TIMESTAMP(3),
    "nationality" TEXT,
    "religion" TEXT,
    "previousSchool" TEXT,
    "yearsOfExperience" INTEGER,
    "photo" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "role" "ROLE" NOT NULL DEFAULT 'teacher',
    "biography" TEXT,
    "emergencyContact" TEXT,
    "emergencyContactName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "User" (
    "employeeId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "contact" TEXT,
    "gender" "Gender" NOT NULL,
    "qualification" TEXT,
    "specialization" TEXT,
    "employmentDate" TIMESTAMP(3),
    "nationality" TEXT,
    "religion" TEXT,
    "previousSchool" TEXT,
    "yearsOfExperience" INTEGER,
    "photo" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "role" "ROLE" NOT NULL,
    "biography" TEXT,
    "emergencyContact" TEXT,
    "emergencyContactName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("employeeId")
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
CREATE TABLE "UserAddress" (
    "GPS" TEXT,
    "location" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("userId")
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

-- CreateTable
CREATE TABLE "Tickets" (
    "ticketId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "ticketItem" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "studentId" TEXT,
    "teacherId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "link_to_action" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "studentId" TEXT,
    "teacherId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_firstName_lastName_email_idx" ON "User"("firstName", "lastName", "email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAddress_studentId_key" ON "StudentAddress"("studentId");

-- CreateIndex
CREATE INDEX "StudentAddress_GPS_location_idx" ON "StudentAddress"("GPS", "location");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAddress_teacherId_key" ON "TeacherAddress"("teacherId");

-- CreateIndex
CREATE INDEX "TeacherAddress_GPS_location_idx" ON "TeacherAddress"("GPS", "location");

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- CreateIndex
CREATE INDEX "UserAddress_GPS_location_idx" ON "UserAddress"("GPS", "location");

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
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolClass" ADD CONSTRAINT "SchoolClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolClass" ADD CONSTRAINT "SchoolClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicRecords" ADD CONSTRAINT "AcademicRecords_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicRecords" ADD CONSTRAINT "AcademicRecords_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("rollId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("employeeId") ON DELETE CASCADE ON UPDATE CASCADE;
