-- CreateEnum
CREATE TYPE "TypeBook" AS ENUM ('ROMANCE', 'SCIENCE_FICTION', 'ADVENTURE', 'PHILOSOPHY', 'DRAMA', 'RELIGIOUS', 'MYSTERY', 'HORROR', 'BIOGRAPHY', 'HISTORICAL', 'FANTASY', 'THRILLER', 'HUMOR', 'CHILDRENS', 'YOUNG_ADULT', 'POETRY', 'ART_AND_DESIGN', 'POLITICS', 'ECONOMICS', 'SELF_HELP', 'CRIME', 'DYSTOPIAN', 'WESTERN', 'GOTHIC', 'EROTIC', 'CYBERPUNK', 'STEAMPUNK', 'COOKING', 'TRAVEL', 'SPORTS', 'FAIRYTALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('NOT_READING', 'READING', 'ON_HOLD', 'FINISHED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "sinopse" TEXT,
    "number_of_pages" INTEGER,
    "type" "TypeBook" NOT NULL,
    "date_of_publication" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_collections" (
    "book_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,

    CONSTRAINT "book_collections_pkey" PRIMARY KEY ("book_id","collection_id")
);

-- CreateTable
CREATE TABLE "book_collections_metadata" (
    "id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_collections_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reads" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "current_page" INTEGER NOT NULL,
    "status" "ReadingStatus" NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_email_idx" ON "users"("username", "email");

-- CreateIndex
CREATE INDEX "books_user_id_title_author_type_idx" ON "books"("user_id", "title", "author", "type");

-- CreateIndex
CREATE INDEX "collections_user_id_name_idx" ON "collections"("user_id", "name");

-- CreateIndex
CREATE INDEX "book_collections_metadata_book_id_collection_id_idx" ON "book_collections_metadata"("book_id", "collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "reads_id_key" ON "reads"("id");

-- CreateIndex
CREATE INDEX "reads_user_id_status_idx" ON "reads"("user_id", "status");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_collections" ADD CONSTRAINT "book_collections_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_collections" ADD CONSTRAINT "book_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_collections_metadata" ADD CONSTRAINT "book_collections_metadata_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_collections_metadata" ADD CONSTRAINT "book_collections_metadata_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_id_fkey" FOREIGN KEY ("id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
