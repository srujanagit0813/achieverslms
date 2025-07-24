import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateQuizQuestionDto) {
    return this.prisma.quizQuestion.create({ data: dto });
  }

  findAll() {
    return this.prisma.quizQuestion.findMany();
  }

  findOne(id: string) {
    return this.prisma.quizQuestion.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateQuizQuestionDto) {
    return this.prisma.quizQuestion.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.quizQuestion.delete({ where: { id } });
  }
}
