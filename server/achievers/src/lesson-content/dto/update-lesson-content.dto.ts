import { PartialType } from '@nestjs/swagger';
import { CreateLessonContentDto } from './create-lesson-content.dto';

export class UpdateLessonContentDto extends PartialType(CreateLessonContentDto) {}
