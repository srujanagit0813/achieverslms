import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimatedVideoDto } from './dto/create-animated-video.dto';
import { UpdateAnimatedVideoDto } from './dto/update-animated-video.dto';

@Injectable()
export class AnimatedVideoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAnimatedVideoDto) {
    return this.prisma.animatedVideo.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        buttonText: data.buttonText,
        image: data.image,
      },
    });
  }

  findAll() {
    return this.prisma.animatedVideo.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const video = await this.prisma.animatedVideo.findUnique({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Animated video with ID ${id} not found`);
    }
    return video;
  }

  async update(id: number, data: UpdateAnimatedVideoDto) {
    const existing = await this.prisma.animatedVideo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Animated video with ID ${id} not found`);
    }

    return this.prisma.animatedVideo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.animatedVideo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Animated video with ID ${id} not found`);
    }

    return this.prisma.animatedVideo.delete({ where: { id } });
  }
}
