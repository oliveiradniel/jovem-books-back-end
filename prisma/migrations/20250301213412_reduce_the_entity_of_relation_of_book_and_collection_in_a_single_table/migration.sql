/*
  Warnings:

  - You are about to drop the `book_collections_metadata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `book_collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book_collections_metadata" DROP CONSTRAINT "book_collections_metadata_book_id_fkey";

-- DropForeignKey
ALTER TABLE "book_collections_metadata" DROP CONSTRAINT "book_collections_metadata_collection_id_fkey";

-- AlterTable
ALTER TABLE "book_collections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" UUID NOT NULL;

-- DropTable
DROP TABLE "book_collections_metadata";

-- AddForeignKey
ALTER TABLE "book_collections" ADD CONSTRAINT "book_collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
