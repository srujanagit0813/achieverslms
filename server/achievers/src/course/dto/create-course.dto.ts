import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty()
  @IsString()
  instructor: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  lessons?: number;

  @ApiProperty()
  @IsInt()
  duration: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number;
}
