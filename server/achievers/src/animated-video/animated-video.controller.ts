import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimatedVideoService } from './animated-video.service';
import { CreateAnimatedVideoDto } from './dto/create-animated-video.dto';
import { UpdateAnimatedVideoDto } from './dto/update-animated-video.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Animated Videos')
@Controller('animated-videos')
export class AnimatedVideoController {
  constructor(private readonly service: AnimatedVideoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new animated video entry' })
  @ApiResponse({ status: 201, description: 'Animated video created successfully' })
  create(@Body() createDto: CreateAnimatedVideoDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all animated videos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an animated video by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an animated video by ID' })
  update(@Param('id') id: string, @Body() updateDto: UpdateAnimatedVideoDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an animated video by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
