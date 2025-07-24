import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';


@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCurriculumDto) {
    return this.prisma.curriculum.create({ data: dto });
  }

  findAll() {
    return this.prisma.curriculum.findMany({
      include: { items: true, course: true },
    });
  }

  findOne(id: string) {
    return this.prisma.curriculum.findUnique({
      where: { id },
      include: { items: true, course: true },
    });
  }

  update(id: string, dto: UpdateCurriculumDto) {
    return this.prisma.curriculum.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.curriculum.delete({ where: { id } });
  }
}
