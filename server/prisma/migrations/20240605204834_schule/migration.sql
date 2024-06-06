/*
  Warnings:

  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Schule` MODIFY `STANDORTTYP` CHAR(1) NULL,
    MODIFY `TRAEGERTYP` INTEGER NULL,
    MODIFY `GEBIETSARTNUMMER` INTEGER NULL,
    MODIFY `SNUMMER` DOUBLE NULL,
    MODIFY `NUMMER` DOUBLE NULL,
    MODIFY `GlobalID` VARCHAR(38) NULL,
    MODIFY `CreationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Creator` VARCHAR(128) NULL,
    MODIFY `EditDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `Editor` VARCHAR(128) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NOT NULL;
