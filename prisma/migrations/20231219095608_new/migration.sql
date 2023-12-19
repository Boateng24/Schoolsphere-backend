/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "isAdmin",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "contact" DROP NOT NULL;
