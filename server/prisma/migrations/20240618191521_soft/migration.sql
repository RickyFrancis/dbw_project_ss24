-- AlterTable
ALTER TABLE `Address` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
