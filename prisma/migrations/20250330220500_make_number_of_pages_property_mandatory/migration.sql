/*
  Warnings:

  - Made the column `number_of_pages` on table `books` required. This step will fail if there are existing NULL values in that column.

*/

-- Correct values
UPDATE "books" SET "number_of_pages" = 200 WHERE "number_of_pages" IS NULL;

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "number_of_pages" SET NOT NULL;
