-- AlterTable
ALTER TABLE `course` MODIFY `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Assignment` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `downloadLink` VARCHAR(191) NOT NULL,
    `submitStatus` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `lessonContentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_lessonContentId_fkey` FOREIGN KEY (`lessonContentId`) REFERENCES `LessonContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
