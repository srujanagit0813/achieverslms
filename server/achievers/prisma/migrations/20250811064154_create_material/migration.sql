/*
  Warnings:

  - You are about to alter the column `type` on the `material` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `material` MODIFY `type` VARCHAR(191) NULL,
    MODIFY `link` VARCHAR(191) NULL,
    MODIFY `download` VARCHAR(191) NULL;
