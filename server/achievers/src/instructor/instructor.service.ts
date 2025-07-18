import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInstructorDto) {
    return this.prisma.instructor.create({ data: dto });
  }

  async findAll() {
    return this.prisma.instructor.findMany({ include: { courses: true } });
  }

  async findOne(id: string) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { id },
      include: { courses: true },
    });
    if (!instructor) throw new NotFoundException('Instructor not found');
    return instructor;
  }

  async update(id: string, dto: UpdateInstructorDto) {
    await this.findOne(id);
    return this.prisma.instructor.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.instructor.delete({ where: { id } });
  }
}

