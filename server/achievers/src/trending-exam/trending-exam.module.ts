import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { TrendingExamController } from './trending-exam.controller';
import { TrendingExamService } from './trending-exam.service';

@Module({
  controllers: [TrendingExamController],
  providers: [TrendingExamService, PrismaService],
})
export class TrendingExamModule {}
