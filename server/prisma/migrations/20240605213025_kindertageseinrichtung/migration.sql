-- AlterTable
ALTER TABLE `Kindertageseinrichtung` MODIFY `TRAEGER` VARCHAR(50) NULL,
    MODIFY `BEZEICHNUNG` VARCHAR(100) NULL,
    MODIFY `KURZBEZEICHNUNG` VARCHAR(100) NULL,
    MODIFY `STRASSE` VARCHAR(24) NULL,
    MODIFY `STRSCHL` VARCHAR(50) NULL,
    MODIFY `HAUSBEZ` VARCHAR(5) NULL,
    MODIFY `PLZ` VARCHAR(50) NULL,
    MODIFY `ORT` VARCHAR(50) NULL,
    MODIFY `HORT` INTEGER NULL,
    MODIFY `KITA` INTEGER NULL,
    MODIFY `BARRIEREFREI` INTEGER NULL,
    MODIFY `INTEGRATIV` INTEGER NULL;
