import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateMaterialDto } from './dto/update-material.dto';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialDto) {
    return this.prisma.material.create({ data: dto });
  }

  async findAll() {
    return this.prisma.material.findMany();
  }

  async findOne(id: string) {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) throw new NotFoundException('Material not found');
    return material;
  }

  async update(id: string, dto: UpdateMaterialDto) {
    return this.prisma.material.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.material.delete({ where: { id } });
  }
}
