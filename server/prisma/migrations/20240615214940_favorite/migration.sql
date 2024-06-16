/*
  Warnings:

  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_jugendberufshilfeId_fkey`;

-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_kindertageseinrichtungId_fkey`;

-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_schuleId_fkey`;

-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_schulsozialarbeitId_fkey`;

-- DropForeignKey
ALTER TABLE `Facility` DROP FOREIGN KEY `Facility_userId_fkey`;

-- DropTable
DROP TABLE `Facility`;

-- CreateTable
CREATE TABLE `_SchuleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SchuleToUser_AB_unique`(`A`, `B`),
    INDEX `_SchuleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_KindertageseinrichtungToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_KindertageseinrichtungToUser_AB_unique`(`A`, `B`),
    INDEX `_KindertageseinrichtungToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SchulsozialarbeitToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SchulsozialarbeitToUser_AB_unique`(`A`, `B`),
    INDEX `_SchulsozialarbeitToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JugendberufshilfeToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JugendberufshilfeToUser_AB_unique`(`A`, `B`),
    INDEX `_JugendberufshilfeToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SchuleToUser` ADD CONSTRAINT `_SchuleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SchuleToUser` ADD CONSTRAINT `_SchuleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KindertageseinrichtungToUser` ADD CONSTRAINT `_KindertageseinrichtungToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Kindertageseinrichtung`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_KindertageseinrichtungToUser` ADD CONSTRAINT `_KindertageseinrichtungToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SchulsozialarbeitToUser` ADD CONSTRAINT `_SchulsozialarbeitToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schulsozialarbeit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SchulsozialarbeitToUser` ADD CONSTRAINT `_SchulsozialarbeitToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JugendberufshilfeToUser` ADD CONSTRAINT `_JugendberufshilfeToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Jugendberufshilfe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JugendberufshilfeToUser` ADD CONSTRAINT `_JugendberufshilfeToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
