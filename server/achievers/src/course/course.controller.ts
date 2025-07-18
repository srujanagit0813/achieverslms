// course.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all courses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Get course by ID' })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
