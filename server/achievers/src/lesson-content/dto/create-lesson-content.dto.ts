import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

export class CreateLessonContentDto {
  @ApiProperty()
  label: string;

  @ApiProperty({ enum: ContentType })
  type: ContentType;

  @ApiProperty({ required: false })
  duration?: string;

  @ApiProperty({ required: false })
  url?: string;

  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty()
  lessonId: string;
}
