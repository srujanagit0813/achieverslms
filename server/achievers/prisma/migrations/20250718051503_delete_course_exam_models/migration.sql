/*
  Warnings:

  - You are about to drop the `assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `returntest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subtopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignment` DROP FOREIGN KEY `Assignment_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_subtopicId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `returntest` DROP FOREIGN KEY `ReturnTest_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `subtopic` DROP FOREIGN KEY `Subtopic_topicId_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `Topic_courseId_fkey`;

-- DropTable
DROP TABLE `assignment`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `exam`;

-- DropTable
DROP TABLE `lesson`;

-- DropTable
DROP TABLE `project`;

-- DropTable
DROP TABLE `quiz`;

-- DropTable
DROP TABLE `returntest`;

-- DropTable
DROP TABLE `subtopic`;

-- DropTable
DROP TABLE `topic`;
