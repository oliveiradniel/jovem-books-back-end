/*
  Warnings:

  - The `author` column on the `books` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the column `type` on the `books` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "books"
  DROP COLUMN "author",
  ADD COLUMN "author" TEXT[],
  ALTER COLUMN "type" SET DATA TYPE "TypeBook"[]
  USING ARRAY["type"]::"TypeBook"[];

-- CreateIndex
CREATE INDEX "books_user_id_title_author_type_idx" ON "books"("user_id", "title", "author", "type");
