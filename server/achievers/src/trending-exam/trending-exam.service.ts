import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrendingExamDto } from './dto/create-trending-exam.dto';
import { UpdateTrendingExamDto } from './dto/update-trending-exam.dto';

@Injectable()
export class TrendingExamService {
  constructor(private prisma: PrismaService) {}

  // Create a new TrendingExam
  create(dto: CreateTrendingExamDto) {
    return this.prisma.trendingExam.create({ data: dto });
  }

  // Get all TrendingExams
  findAll() {
    return this.prisma.trendingExam.findMany();
  }

  // Get a single TrendingExam by ID
  async findOne(id: string) {
    const exam = await this.prisma.trendingExam.findUnique({
      where: { id },
    });

    if (!exam) {
      throw new NotFoundException(`TrendingExam with ID ${id} not found`);
    }

    return exam;
  }

  // Update a TrendingExam by ID
  async update(id: string, dto: UpdateTrendingExamDto) {
  await this.findOne(id); // only check by id
  return this.prisma.trendingExam.update({
    where: { id },
    data: dto,
  });
}


  // Delete a TrendingExam by ID
  async remove(id: string) {
    // Ensure the record exists first
    await this.findOne(id);

    return this.prisma.trendingExam.delete({
      where: { id },
    });
  }
}
