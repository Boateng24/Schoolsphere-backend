/*
  Warnings:

  - The values [Pending,Approved,Rejected] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ticketItem` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `item` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('pending', 'approved', 'rejected');
ALTER TABLE "Tickets" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "ticketItem",
ADD COLUMN     "item" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Tickets_name_ticketId_item_idx" ON "Tickets"("name", "ticketId", "item");
