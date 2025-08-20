import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';


@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  createLesson(dto: CreateLessonDto) {
    return this.prisma.lesson.create({ data: dto });
  }

  getAllLessons() {
    return this.prisma.lesson.findMany({ include: { contents: true ,course:true} });
  }

  getLessonsByCourseId(courseId: string) {
  return this.prisma.lesson.findMany({
    where: { courseId },
    include: { contents: true, course: true },
  });
}


  updateLesson(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  deleteLesson(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  createContent(dto: CreateContentDto) {
    return this.prisma.lessonContent.create({ data: dto });
  }

  updateContent(id: string, dto: UpdateContentDto) {
    return this.prisma.lessonContent.update({ where: { id }, data: dto });
  }

  deleteContent(id: string) {
    return this.prisma.lessonContent.delete({ where: { id } });
  }
}
