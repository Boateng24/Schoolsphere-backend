/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "createdAt",
ADD COLUMN     "ticketDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
