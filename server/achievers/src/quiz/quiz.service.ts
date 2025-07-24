import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({ data: dto });
  }

  findAll() {
    return this.prisma.quiz.findMany({ include: { quizQuestions: true } });
  }

  findOne(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { quizQuestions: true },
    });
  }

  update(id: string, dto: UpdateQuizDto) {
    return this.prisma.quiz.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
