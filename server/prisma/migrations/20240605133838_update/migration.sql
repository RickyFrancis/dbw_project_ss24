/*
  Warnings:

  - A unique constraint covering the columns `[API_OBJECTID]` on the table `Schule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_ID]` on the table `Schule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Schule_API_OBJECTID_key` ON `Schule`(`API_OBJECTID`);

-- CreateIndex
CREATE UNIQUE INDEX `Schule_API_ID_key` ON `Schule`(`API_ID`);
