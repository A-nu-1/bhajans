-- CreateTable
CREATE TABLE "Bhajan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEnglish" TEXT,
    "language" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "description" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bhajan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BhajanParagraph" (
    "id" TEXT NOT NULL,
    "bhajanId" TEXT NOT NULL,
    "orderNo" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BhajanParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BhajanParagraph_bhajanId_idx" ON "BhajanParagraph"("bhajanId");

-- CreateIndex
CREATE UNIQUE INDEX "BhajanParagraph_bhajanId_orderNo_key" ON "BhajanParagraph"("bhajanId", "orderNo");

-- AddForeignKey
ALTER TABLE "BhajanParagraph" ADD CONSTRAINT "BhajanParagraph_bhajanId_fkey" FOREIGN KEY ("bhajanId") REFERENCES "Bhajan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
