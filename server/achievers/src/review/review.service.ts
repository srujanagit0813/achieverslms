import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateReviewDto) {
    return this.prisma.review.create({ data: dto });
  }

  findAll() {
    return this.prisma.review.findMany({ include: { course: true } });
  }

  findOne(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
