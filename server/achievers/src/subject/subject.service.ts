import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({ data: dto });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  async findOne(id: string) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new NotFoundException(`Subject with ID ${id} not found`);
    return subject;
  }

  async update(id: string, dto: UpdateSubjectDto) {
    await this.findOne(id);
    return this.prisma.subject.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subject.delete({ where: { id } });
  }
}
