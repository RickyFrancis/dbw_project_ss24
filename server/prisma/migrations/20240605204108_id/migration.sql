/*
  Warnings:

  - The primary key for the `Entity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `OBJECTID` on the `Entity` table. All the data in the column will be lost.
  - The primary key for the `Jugendberufshilfe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Jugendberufshilfe` table. All the data in the column will be lost.
  - You are about to drop the column `OBJECTID` on the `Jugendberufshilfe` table. All the data in the column will be lost.
  - The primary key for the `Kindertageseinrichtung` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Kindertageseinrichtung` table. All the data in the column will be lost.
  - You are about to drop the column `OBJECTID` on the `Kindertageseinrichtung` table. All the data in the column will be lost.
  - The primary key for the `Schule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Schule` table. All the data in the column will be lost.
  - The primary key for the `Schulsozialarbeit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Schulsozialarbeit` table. All the data in the column will be lost.
  - You are about to drop the column `OBJECTID` on the `Schulsozialarbeit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[API_OBJECTID]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_ID]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_OBJECTID]` on the table `Jugendberufshilfe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_ID]` on the table `Jugendberufshilfe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_OBJECTID]` on the table `Kindertageseinrichtung` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_ID]` on the table `Kindertageseinrichtung` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_OBJECTID]` on the table `Schulsozialarbeit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[API_ID]` on the table `Schulsozialarbeit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `API_ID` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_OBJECTID` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_ID` to the `Jugendberufshilfe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_OBJECTID` to the `Jugendberufshilfe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Jugendberufshilfe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_ID` to the `Kindertageseinrichtung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_OBJECTID` to the `Kindertageseinrichtung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Kindertageseinrichtung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Schule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_ID` to the `Schulsozialarbeit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `API_OBJECTID` to the `Schulsozialarbeit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Schulsozialarbeit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entity` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    DROP COLUMN `OBJECTID`,
    ADD COLUMN `API_ID` INTEGER NOT NULL,
    ADD COLUMN `API_OBJECTID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Jugendberufshilfe` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    DROP COLUMN `OBJECTID`,
    ADD COLUMN `API_ID` INTEGER NOT NULL,
    ADD COLUMN `API_OBJECTID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Kindertageseinrichtung` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    DROP COLUMN `OBJECTID`,
    ADD COLUMN `API_ID` INTEGER NOT NULL,
    ADD COLUMN `API_OBJECTID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Schule` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `BEZUGNR` CHAR(3) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Schulsozialarbeit` DROP PRIMARY KEY,
    DROP COLUMN `ID`,
    DROP COLUMN `OBJECTID`,
    ADD COLUMN `API_ID` INTEGER NOT NULL,
    ADD COLUMN `API_OBJECTID` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Entity_API_OBJECTID_key` ON `Entity`(`API_OBJECTID`);

-- CreateIndex
CREATE UNIQUE INDEX `Entity_API_ID_key` ON `Entity`(`API_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `Jugendberufshilfe_API_OBJECTID_key` ON `Jugendberufshilfe`(`API_OBJECTID`);

-- CreateIndex
CREATE UNIQUE INDEX `Jugendberufshilfe_API_ID_key` ON `Jugendberufshilfe`(`API_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `Kindertageseinrichtung_API_OBJECTID_key` ON `Kindertageseinrichtung`(`API_OBJECTID`);

-- CreateIndex
CREATE UNIQUE INDEX `Kindertageseinrichtung_API_ID_key` ON `Kindertageseinrichtung`(`API_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `Schulsozialarbeit_API_OBJECTID_key` ON `Schulsozialarbeit`(`API_OBJECTID`);

-- CreateIndex
CREATE UNIQUE INDEX `Schulsozialarbeit_API_ID_key` ON `Schulsozialarbeit`(`API_ID`);
