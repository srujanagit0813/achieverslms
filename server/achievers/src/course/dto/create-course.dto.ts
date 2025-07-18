import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  title: string;

//   @ApiProperty()
//   lessons: number;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  free: boolean;

  @ApiProperty()
  author: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  video: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  lastUpdated: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  instructorId: string;
}
