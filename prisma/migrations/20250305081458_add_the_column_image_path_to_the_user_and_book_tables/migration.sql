/*
  Warnings:

  - Added the required column `image_path` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_path` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "image_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image_path" TEXT NOT NULL;
