import { ApiProperty } from '@nestjs/swagger';

export class CreateCurriculumDto {
  @ApiProperty()
  section: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  courseId: string;
}
