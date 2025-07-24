import { PartialType } from '@nestjs/swagger';
import { CreateCurriculumItemDto } from './create-curriculum-item.dto';

export class UpdateCurriculumItemDto extends PartialType(CreateCurriculumItemDto) {}
