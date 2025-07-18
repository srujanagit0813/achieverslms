import {
  Controller, Get, Post, Body, Param, Put, Delete,
} from '@nestjs/common';
import { LessonContentService } from './lesson-content.service';
import { CreateLessonContentDto } from './dto/create-lesson-content.dto';
import { UpdateLessonContentDto } from './dto/update-lesson-content.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('LessonContent')
@Controller('lesson-content')
export class LessonContentController {
  constructor(private readonly service: LessonContentService) {}

  @Post()
  create(@Body() dto: CreateLessonContentDto) {
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

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLessonContentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
