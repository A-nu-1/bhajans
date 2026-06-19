/*
  Warnings:

  - You are about to drop the column `category` on the `Bhajan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bhajan" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BhajanToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BhajanToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "_BhajanToCategory_B_index" ON "_BhajanToCategory"("B");

-- AddForeignKey
ALTER TABLE "_BhajanToCategory" ADD CONSTRAINT "_BhajanToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Bhajan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BhajanToCategory" ADD CONSTRAINT "_BhajanToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
