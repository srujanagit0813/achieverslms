-- CreateTable
CREATE TABLE `Material` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` ENUM('PDF', 'Video', 'Image') NOT NULL,
    `pages` INTEGER NULL,
    `size` VARCHAR(191) NULL,
    `link` VARCHAR(191) NOT NULL,
    `download` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `author` VARCHAR(191) NULL,
    `lessonContentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_lessonContentId_fkey` FOREIGN KEY (`lessonContentId`) REFERENCES `LessonContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
