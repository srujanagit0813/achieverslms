import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurriculumItemService } from './curriculum-item.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateCurriculumItemDto } from './dto/create-curriculum-item.dto';
import { UpdateCurriculumItemDto } from './dto/update-curriculum-item.dto';

@ApiTags('Curriculum Items')
@Controller('curriculum-items')
export class CurriculumItemController {
  constructor(private readonly service: CurriculumItemService) {}

  @Post()
  create(@Body() dto: CreateCurriculumItemDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateCurriculumItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
