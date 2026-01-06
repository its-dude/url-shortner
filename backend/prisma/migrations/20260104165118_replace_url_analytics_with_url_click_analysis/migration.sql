/*
  Warnings:

  - You are about to drop the `UrlAnalytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UrlAnalytics" DROP CONSTRAINT "UrlAnalytics_urlId_fkey";

-- DropTable
DROP TABLE "UrlAnalytics";

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlClickAnalysis" (
    "id" SERIAL NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "urlId" INTEGER NOT NULL,

    CONSTRAINT "UrlClickAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- AddForeignKey
ALTER TABLE "UrlClickAnalysis" ADD CONSTRAINT "UrlClickAnalysis_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UrlClickAnalysis" ADD CONSTRAINT "UrlClickAnalysis_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
