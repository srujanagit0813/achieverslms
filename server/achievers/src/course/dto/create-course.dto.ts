import { ApiProperty  } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  categoryId: string;

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

  // @ApiProperty()
  // free: boolean;

 @ApiProperty()
@IsOptional()
free: string | boolean;


  @ApiProperty()
  rating: number;


     @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string;
 

  @ApiProperty()
  lastUpdated: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  instructorId: string;
}