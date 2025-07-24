import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  courseId: string;
}
