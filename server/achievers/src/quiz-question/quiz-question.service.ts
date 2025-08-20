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
    return this.prisma.quizQuestion.findMany({  include: {
      quiz: true, // <-- This loads the related quiz (which includes the title)
    },
});
  }

findByQuizId(quizId: string) {
  return this.prisma.quizQuestion.findMany({
    where: { quizId },
    include: {
      quiz: true, // loads the related quiz
    },
  });
}

  update(id: string, dto: UpdateQuizQuestionDto) {
    return this.prisma.quizQuestion.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.quizQuestion.delete({ where: { id } });
  }
}
