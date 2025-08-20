import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';


import { ApiTags, ApiOperation, ApiResponse ,ApiBody} from '@nestjs/swagger';
import { CreateTrendingExamDto } from './dto/create-trending-exam.dto';
import { UpdateTrendingExamDto } from './dto/update-trending-exam.dto';
import { TrendingExamService } from './trending-exam.service';
@ApiTags('Trending Exams')
@Controller('trending-exams')
export class TrendingExamController {
  constructor(private readonly trendingExamService: TrendingExamService) {}

  @Post()
    @ApiBody({ type: CreateTrendingExamDto }) // 👈 This tells Swagger to show your DTO

  @ApiOperation({ summary: 'Create a new trending exam' })
  @ApiResponse({ status: 201, description: 'Trending exam created successfully.' })
  create(@Body() dto: CreateTrendingExamDto) {
    return this.trendingExamService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trending exams' })
  findAll() {
    return this.trendingExamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trending exam by ID' })
  findOne(@Param('id') id: string) {
    return this.trendingExamService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trending exam' })
  update(@Param('id') id: string, @Body() dto: UpdateTrendingExamDto) {
    return this.trendingExamService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trending exam' })
  remove(@Param('id') id: string) {
    return this.trendingExamService.remove(id);
  }
}