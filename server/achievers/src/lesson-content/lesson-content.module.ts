import { Module } from '@nestjs/common';
import { LessonContentService } from './lesson-content.service';
import { LessonContentController } from './lesson-content.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LessonContentController],
  providers: [LessonContentService, PrismaService],
})
export class LessonContentModule {}
