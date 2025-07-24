import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@ApiTags('Quiz Question')
@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly service: QuizQuestionService) {}

  @Post()
  create(@Body() dto: CreateQuizQuestionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuizQuestionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
