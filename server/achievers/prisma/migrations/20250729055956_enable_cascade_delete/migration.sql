-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_lessonContentId_fkey`;

-- DropForeignKey
ALTER TABLE `curriculumitem` DROP FOREIGN KEY `CurriculumItem_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `lessoncontent` DROP FOREIGN KEY `LessonContent_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `material` DROP FOREIGN KEY `Material_lessonContentId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_lessonContentId_fkey`;

-- DropForeignKey
ALTER TABLE `quizquestion` DROP FOREIGN KEY `QuizQuestion_quizId_fkey`;

-- DropIndex
DROP INDEX `Assignment_lessonContentId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `CurriculumItem_curriculumId_fkey` ON `curriculumitem`;

-- DropIndex
DROP INDEX `LessonContent_lessonId_fkey` ON `lessoncontent`;

-- DropIndex
DROP INDEX `Material_lessonContentId_fkey` ON `material`;

-- DropIndex
DROP INDEX `Quiz_lessonContentId_fkey` ON `quiz`;

-- DropIndex
DROP INDEX `QuizQuestion_quizId_fkey` ON `quizquestion`;

-- AddForeignKey
ALTER TABLE `CurriculumItem` ADD CONSTRAINT `CurriculumItem_curriculumId_fkey` FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonContent` ADD CONSTRAINT `LessonContent_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_lessonContentId_fkey` FOREIGN KEY (`lessonContentId`) REFERENCES `LessonContent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_lessonContentId_fkey` FOREIGN KEY (`lessonContentId`) REFERENCES `LessonContent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_lessonContentId_fkey` FOREIGN KEY (`lessonContentId`) REFERENCES `LessonContent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
