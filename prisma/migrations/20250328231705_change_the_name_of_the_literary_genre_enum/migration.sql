/*
  Warnings:

  - The `genre_literary` column on the `books` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GenreLiterary" AS ENUM ('ROMANCE', 'SCIENCE_FICTION', 'ADVENTURE', 'PHILOSOPHY', 'DRAMA', 'RELIGIOUS', 'MYSTERY', 'HORROR', 'BIOGRAPHY', 'HISTORICAL', 'FANTASY', 'THRILLER', 'HUMOR', 'CHILDRENS', 'YOUNG_ADULT', 'POETRY', 'ART_AND_DESIGN', 'POLITICS', 'ECONOMICS', 'SELF_HELP', 'CRIME', 'DYSTOPIAN', 'WESTERN', 'GOTHIC', 'EROTIC', 'CYBERPUNK', 'STEAMPUNK', 'COOKING', 'TRAVEL', 'SPORTS', 'FAIRYTALE', 'OTHER');

-- AlterTable
ALTER TABLE "books" DROP COLUMN "genre_literary",
ADD COLUMN     "genre_literary" "GenreLiterary"[];

-- DropEnum
DROP TYPE "TypeBook";

-- CreateIndex
CREATE INDEX "books_user_id_title_authors_genre_literary_idx" ON "books"("user_id", "title", "authors", "genre_literary");
