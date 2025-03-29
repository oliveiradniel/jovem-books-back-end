/*
  Warnings:

  - The values [NOT_READING] on the enum `ReadingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updated_at` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `reads` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `reads` table. All the data in the column will be lost.
  - Made the column `current_page` on table `reads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `reads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReadingStatus_new" AS ENUM ('READING', 'ON_HOLD', 'FINISHED');
ALTER TABLE "reads" ALTER COLUMN "status" TYPE "ReadingStatus_new" USING ("status"::text::"ReadingStatus_new");
ALTER TYPE "ReadingStatus" RENAME TO "ReadingStatus_old";
ALTER TYPE "ReadingStatus_new" RENAME TO "ReadingStatus";
DROP TYPE "ReadingStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "reads" DROP CONSTRAINT "reads_user_id_fkey";

-- DropIndex
DROP INDEX "reads_user_id_status_idx";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "reads" DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "finished_at" TIMESTAMP(3),

ALTER COLUMN "current_page" SET NOT NULL,
ALTER COLUMN "current_page" SET DEFAULT 1,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'READING';
