import { Controller, Get, Query, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Controller('quiz-questions')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @Post()
  create(@Body() dto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(dto);
  }

  
  @Get()
  findAll(@Query('quizId') quizId?: string) {
    if (quizId) {
      return this.quizQuestionService.findByQuizId(quizId);
    }
    return this.quizQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizQuestionService.findByQuizId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuizQuestionDto) {
    return this.quizQuestionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizQuestionService.remove(id);
  }
}
