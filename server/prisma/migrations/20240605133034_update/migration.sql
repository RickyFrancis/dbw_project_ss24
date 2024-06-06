/*
  Warnings:

  - The primary key for the `Schule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OBJECTID` on the `Schule` table. All the data in the column will be lost.
  - Added the required column `API_ID` to the `Schule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_OBJECTID` to the `Schule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schule` DROP PRIMARY KEY,
    DROP COLUMN `OBJECTID`,
    ADD COLUMN `API_ID` INTEGER NOT NULL,
    ADD COLUMN `API_OBJECTID` INTEGER NOT NULL,
    MODIFY `ID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID`);

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updatedAt` DROP DEFAULT;
