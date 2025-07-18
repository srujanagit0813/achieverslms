/*
  Warnings:

  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `curriculum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `curriculumitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `Courses_instructorId_fkey`;

-- DropForeignKey
ALTER TABLE `curriculum` DROP FOREIGN KEY `Curriculum_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `curriculumitem` DROP FOREIGN KEY `CurriculumItem_curriculumId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_courseId_fkey`;

-- DropTable
DROP TABLE `courses`;

-- DropTable
DROP TABLE `curriculum`;

-- DropTable
DROP TABLE `curriculumitem`;

-- DropTable
DROP TABLE `instructor`;

-- DropTable
DROP TABLE `review`;
