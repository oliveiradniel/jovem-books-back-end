/*
  Warnings:

  - You are about to drop the column `genre_literary` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books_user_id_title_authors_genre_literary_idx";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "genre_literary",
ADD COLUMN     "literary_genre" TEXT[];

-- DropEnum
DROP TYPE "literaryGenre";

-- CreateIndex
CREATE INDEX "books_user_id_title_authors_literary_genre_idx" ON "books"("user_id", "title", "authors", "literary_genre");
