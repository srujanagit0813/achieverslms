import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.assignment.findMany({
      include: { lessonContent: true },
    });
  }

  findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: { lessonContent: true },
    });
  }

  async update(id: string, dto: UpdateAssignmentDto) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException('Assignment not found');

    return this.prisma.assignment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException('Assignment not found');

    return this.prisma.assignment.delete({ where: { id } });
  }
}