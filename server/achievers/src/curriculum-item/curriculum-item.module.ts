import { Module } from '@nestjs/common';
import { CurriculumItemService } from './curriculum-item.service';
import { CurriculumItemController } from './curriculum-item.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CurriculumItemController],
  providers: [CurriculumItemService, PrismaService],
  exports: [CurriculumItemService],
})
export class CurriculumItemModule {}
