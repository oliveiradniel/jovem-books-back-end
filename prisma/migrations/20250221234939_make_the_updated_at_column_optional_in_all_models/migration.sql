-- AlterTable
ALTER TABLE "book_collections_metadata" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "collections" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reads" ALTER COLUMN "current_page" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;
