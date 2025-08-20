import { PartialType } from '@nestjs/swagger';
import { CreateTrendingExamDto } from './create-trending-exam.dto';

export class UpdateTrendingExamDto extends PartialType(CreateTrendingExamDto) {}
