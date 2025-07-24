import { ApiProperty } from '@nestjs/swagger';

export class CreateCurriculumItemDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  duration?: string;

  @ApiProperty({ required: false })
  preview?: boolean;

  @ApiProperty({ required: false })
  locked?: boolean;

  @ApiProperty({ required: false })
  questions?: number;

  @ApiProperty()
  curriculumId: string;
}
