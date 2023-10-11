-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "Tickets" (
    "ticketId" SERIAL NOT NULL,
    "ticketName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "ticketItem" TEXT NOT NULL,
    "ticketDate" TIMESTAMP(3) NOT NULL,
    "ticketStatus" "Status" NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticketId")
);
