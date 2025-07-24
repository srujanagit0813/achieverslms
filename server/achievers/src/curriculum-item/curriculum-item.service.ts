import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurriculumItemDto } from './dto/create-curriculum-item.dto';
import { UpdateCurriculumItemDto } from './dto/update-curriculum-item.dto';

@Injectable()
export class CurriculumItemService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCurriculumItemDto) {
    return this.prisma.curriculumItem.create({ data: dto });
  }

  findAll() {
    return this.prisma.curriculumItem.findMany({ include: { curriculum: true } });
  }

  findOne(id: string) {
    return this.prisma.curriculumItem.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCurriculumItemDto) {
    return this.prisma.curriculumItem.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.curriculumItem.delete({ where: { id } });
  }
}
