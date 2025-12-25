/*
  Warnings:

  - Made the column `code` on table `Url` required. This step will fail if there are existing NULL values in that column.
  - Made the column `originalUrl` on table `Url` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "originalUrl" SET NOT NULL;
