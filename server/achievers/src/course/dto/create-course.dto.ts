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
  actualPrice: number;

  @ApiProperty()
  discountedPrice: number;

  @ApiProperty()
  free: boolean;

 

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
