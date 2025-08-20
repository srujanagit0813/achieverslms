/*
  Warnings:

  - You are about to drop the column `author` on the `material` table. All the data in the column will be lost.
  - The primary key for the `trendingexam` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `author`;

-- AlterTable
ALTER TABLE `trendingexam` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
