import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';

@Injectable()
export class LessonContentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLessonContentDto) {
    return this.prisma.lessonContent.create({ data: dto });
  }

  findAll() {
    return this.prisma.lessonContent.findMany({ include: { lesson: true } });
  }

  findOne(id: string) {
    return this.prisma.lessonContent.findUnique({
      where: { id },
      include: { lesson: true },
    });
  }

  update(id: string, dto: UpdateLessonContentDto) {
    return this.prisma.lessonContent.update({ where: { id }, data: dto });
  }

  delete(id: string) {
    return this.prisma.lessonContent.delete({ where: { id } });
  }
}
