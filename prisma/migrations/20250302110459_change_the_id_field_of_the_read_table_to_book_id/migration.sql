/*
  Warnings:

  - You are about to drop the column `id` on the `reads` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookId]` on the table `reads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `reads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reads" DROP CONSTRAINT "reads_id_fkey";

-- DropIndex
DROP INDEX "reads_id_key";

-- AlterTable
ALTER TABLE "reads" DROP COLUMN "id",
ADD COLUMN     "bookId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reads_bookId_key" ON "reads"("bookId");

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
