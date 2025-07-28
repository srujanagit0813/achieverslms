/*
  Warnings:

  - You are about to drop the column `author` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `oldPrice` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `author`,
    DROP COLUMN `oldPrice`,
    DROP COLUMN `price`,
    ADD COLUMN `actualPrice` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `discountedPrice` DOUBLE NOT NULL DEFAULT 0;
