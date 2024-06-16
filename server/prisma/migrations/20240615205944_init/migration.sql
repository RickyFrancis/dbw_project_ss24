-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NOT NULL,
    `street2` VARCHAR(255) NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NULL,
    `postalCode` VARCHAR(50) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `userId` INTEGER NOT NULL,
    `primaryAddress` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facilityType` ENUM('Schule', 'Kindertageseinrichtung', 'Schulsozialarbeit', 'Jugendberufshilfe') NULL,
    `schuleId` INTEGER NULL,
    `kindertageseinrichtungId` INTEGER NULL,
    `schulsozialarbeitId` INTEGER NULL,
    `jugendberufshilfeId` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `API_OBJECTID` INTEGER NOT NULL,
    `API_ID` INTEGER NOT NULL,
    `TYP` INTEGER NOT NULL,
    `ART` VARCHAR(50) NOT NULL,
    `STANDORTTYP` CHAR(50) NULL,
    `BEZEICHNUNG` VARCHAR(255) NULL,
    `BEZEICHNUNGZUSATZ` VARCHAR(255) NULL,
    `KURZBEZEICHNUNG` VARCHAR(50) NULL,
    `STRASSE` VARCHAR(200) NULL,
    `PLZ` VARCHAR(200) NULL,
    `ORT` VARCHAR(50) NULL,
    `TELEFON` VARCHAR(50) NULL,
    `FAX` VARCHAR(50) NULL,
    `EMAIL` VARCHAR(55) NULL,
    `PROFILE` VARCHAR(255) NULL,
    `SPRACHEN` VARCHAR(255) NULL,
    `WWW` VARCHAR(255) NULL,
    `TRAEGER` VARCHAR(60) NULL,
    `TRAEGERTYP` INTEGER NULL,
    `BEZUGNR` CHAR(50) NULL,
    `GEBIETSARTNUMMER` INTEGER NULL,
    `SNUMMER` DOUBLE NULL,
    `NUMMER` DOUBLE NULL,
    `GlobalID` VARCHAR(38) NULL,
    `CreationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Creator` VARCHAR(128) NULL,
    `EditDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Editor` VARCHAR(128) NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `nominatim` JSON NULL,
    `facilityType` ENUM('Schule', 'Kindertageseinrichtung', 'Schulsozialarbeit', 'Jugendberufshilfe') NOT NULL DEFAULT 'Schule',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Schule_API_OBJECTID_key`(`API_OBJECTID`),
    UNIQUE INDEX `Schule_API_ID_key`(`API_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kindertageseinrichtung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `API_OBJECTID` INTEGER NOT NULL,
    `API_ID` INTEGER NOT NULL,
    `TRAEGER` VARCHAR(255) NULL,
    `BEZEICHNUNG` VARCHAR(255) NULL,
    `KURZBEZEICHNUNG` VARCHAR(255) NULL,
    `STRASSE` VARCHAR(255) NULL,
    `STRSCHL` VARCHAR(255) NULL,
    `HAUSBEZ` VARCHAR(255) NULL,
    `PLZ` VARCHAR(255) NULL,
    `ORT` VARCHAR(255) NULL,
    `HORT` INTEGER NULL,
    `KITA` INTEGER NULL,
    `URL` VARCHAR(255) NULL,
    `TELEFON` VARCHAR(255) NULL,
    `FAX` VARCHAR(255) NULL,
    `EMAIL` VARCHAR(255) NULL,
    `BARRIEREFREI` INTEGER NULL,
    `INTEGRATIV` INTEGER NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `nominatim` JSON NULL,
    `facilityType` ENUM('Schule', 'Kindertageseinrichtung', 'Schulsozialarbeit', 'Jugendberufshilfe') NOT NULL DEFAULT 'Kindertageseinrichtung',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Kindertageseinrichtung_API_OBJECTID_key`(`API_OBJECTID`),
    UNIQUE INDEX `Kindertageseinrichtung_API_ID_key`(`API_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schulsozialarbeit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `API_OBJECTID` INTEGER NOT NULL,
    `API_ID` INTEGER NOT NULL,
    `TRAEGER` VARCHAR(255) NOT NULL,
    `LEISTUNGEN` VARCHAR(255) NOT NULL,
    `BEZEICHNUNG` VARCHAR(255) NULL,
    `KURZBEZEICHNUNG` VARCHAR(255) NULL,
    `STRASSE` VARCHAR(255) NULL,
    `PLZ` VARCHAR(50) NOT NULL,
    `ORT` VARCHAR(50) NOT NULL,
    `TELEFON` VARCHAR(50) NULL,
    `EMAIL` VARCHAR(255) NULL,
    `FAX` VARCHAR(50) NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `nominatim` JSON NULL,
    `facilityType` ENUM('Schule', 'Kindertageseinrichtung', 'Schulsozialarbeit', 'Jugendberufshilfe') NOT NULL DEFAULT 'Schulsozialarbeit',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Schulsozialarbeit_API_OBJECTID_key`(`API_OBJECTID`),
    UNIQUE INDEX `Schulsozialarbeit_API_ID_key`(`API_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jugendberufshilfe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `API_OBJECTID` INTEGER NOT NULL,
    `API_ID` INTEGER NOT NULL,
    `TRAEGER` VARCHAR(255) NOT NULL,
    `LEISTUNGEN` VARCHAR(255) NOT NULL,
    `BEZEICHNUNG` VARCHAR(255) NULL,
    `KURZBEZEICHNUNG` VARCHAR(255) NULL,
    `STRASSE` VARCHAR(255) NULL,
    `PLZ` VARCHAR(50) NOT NULL,
    `ORT` VARCHAR(50) NOT NULL,
    `TELEFON` VARCHAR(50) NULL,
    `EMAIL` VARCHAR(255) NULL,
    `FAX` VARCHAR(50) NULL,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `nominatim` JSON NULL,
    `facilityType` ENUM('Schule', 'Kindertageseinrichtung', 'Schulsozialarbeit', 'Jugendberufshilfe') NOT NULL DEFAULT 'Jugendberufshilfe',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Jugendberufshilfe_API_OBJECTID_key`(`API_OBJECTID`),
    UNIQUE INDEX `Jugendberufshilfe_API_ID_key`(`API_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_schuleId_fkey` FOREIGN KEY (`schuleId`) REFERENCES `Schule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_kindertageseinrichtungId_fkey` FOREIGN KEY (`kindertageseinrichtungId`) REFERENCES `Kindertageseinrichtung`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_schulsozialarbeitId_fkey` FOREIGN KEY (`schulsozialarbeitId`) REFERENCES `Schulsozialarbeit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_jugendberufshilfeId_fkey` FOREIGN KEY (`jugendberufshilfeId`) REFERENCES `Jugendberufshilfe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facility` ADD CONSTRAINT `Facility_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
