/*
  Warnings:

  - Added the required column `updatedAt` to the `Jugendberufshilfe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Kindertageseinrichtung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Schule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Schulsozialarbeit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Jugendberufshilfe` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Kindertageseinrichtung` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Schule` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Schulsozialarbeit` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
