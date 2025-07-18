import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Instructors')
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  @ApiBody({ type: CreateInstructorDto })
  create(@Body() dto: CreateInstructorDto) {
    return this.instructorService.create(dto);
  }

  @Get()
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Instructor ID' })
  findOne(@Param('id') id: string) {
    return this.instructorService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Instructor ID' })
  @ApiBody({ type: UpdateInstructorDto })
  update(@Param('id') id: string, @Body() dto: UpdateInstructorDto) {
    return this.instructorService.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Instructor ID' })
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }
}

