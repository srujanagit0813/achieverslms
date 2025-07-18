-- CreateTable
CREATE TABLE `Courses` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `lessons` INTEGER NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `oldPrice` DOUBLE NOT NULL,
    `free` BOOLEAN NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `video` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `instructorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curriculum` (
    `id` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CurriculumItem` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NULL,
    `preview` BOOLEAN NULL,
    `locked` BOOLEAN NULL,
    `questions` INTEGER NULL,
    `curriculumId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curriculum` ADD CONSTRAINT `Curriculum_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurriculumItem` ADD CONSTRAINT `CurriculumItem_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
