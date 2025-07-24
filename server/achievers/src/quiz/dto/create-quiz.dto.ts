import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty()
  label: string;

  @ApiProperty()
  questions: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  marks: number;

  @ApiProperty()
  lessonContentId: string;
}
