import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  courseId: string;
}
