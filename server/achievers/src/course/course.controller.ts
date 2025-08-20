import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import {

  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Express } from 'express';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

 


 
@Post('create')
@ApiBody({ type: CreateCourseDto }) 
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, uniqueName); // ✅ saved in 'uploads/<uniqueName>'
        },
      }),
    }),
  )
  async createCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    // Add the image filename to body before passing to service
    const formData = {
      ...body,
      actualPrice: parseFloat(body.actualPrice),
      discountedPrice: parseFloat(body.discountedPrice),
      rating: parseFloat(body.rating),
      free: body.free === 'true',
      imageUrl: file?.filename || '',
      lastUpdated: new Date(body.lastUpdated),
    };

    return this.courseService.create(formData);
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateCourse(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const parsedDto = {
      title: body.title,
      instructorId: body.instructorId,
      categoryId: body.categoryId,
      duration: body.duration,
      actualPrice: parseFloat(body.actualPrice),
      discountedPrice: parseFloat(body.discountedPrice),
      rating: parseFloat(body.rating),
      videoUrl: body.videoUrl,
      description: body.description,
      free: body.free === 'true' || body.free === true,
      lastUpdated: new Date(body.lastUpdated),
      imageUrl: file?.filename,
    };

    return this.courseService.update(id, parsedDto);
  }
  

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}