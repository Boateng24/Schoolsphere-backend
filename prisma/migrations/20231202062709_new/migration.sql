/*
  Warnings:

  - The values [pending,approved,rejected] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Pending', 'Approved', 'Rejected');
ALTER TABLE "Tickets" ALTER COLUMN "ticketStatus" TYPE "Status_new" USING ("ticketStatus"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;
