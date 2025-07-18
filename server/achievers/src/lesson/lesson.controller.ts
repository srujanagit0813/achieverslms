import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { LessonService } from './lesson.service';

import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonController {
  constructor(private readonly service: LessonService) {}

  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.service.createLesson(dto);
  }

  @Get()
  getAllLessons() {
    return this.service.getAllLessons();
  }

  @Get(':id')
  getLesson(@Param('id') id: string) {
    return this.service.getLessonById(id);
  }

  @Put(':id')
  updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.service.updateLesson(id, dto);
  }

  @Delete(':id')
  deleteLesson(@Param('id') id: string) {
    return this.service.deleteLesson(id);
  }

  // Contents
  @Post('content')
  createContent(@Body() dto: CreateContentDto) {
    return this.service.createContent(dto);
  }

  @Put('content/:id')
  updateContent(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.service.updateContent(id, dto);
  }

  @Delete('content/:id')
  deleteContent(@Param('id') id: string) {
    return this.service.deleteContent(id);
  }
}
