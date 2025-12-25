/*
  Warnings:

  - You are about to drop the column `link` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "link",
ADD COLUMN     "originalUrl" TEXT,
ALTER COLUMN "code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");
