/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books_user_id_title_author_type_idx";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
DROP COLUMN "type",
ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "genre_literary" "TypeBook"[];

-- CreateIndex
CREATE INDEX "books_user_id_title_authors_genre_literary_idx" ON "books"("user_id", "title", "authors", "genre_literary");
