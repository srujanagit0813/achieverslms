/*
  Warnings:

  - You are about to drop the column `image` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `image`,
    DROP COLUMN `video`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL;
