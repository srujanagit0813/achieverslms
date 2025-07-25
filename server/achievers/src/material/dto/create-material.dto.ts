import { ApiProperty } from '@nestjs/swagger';
import { MaterialType } from '@prisma/client';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsUrl,
} from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty({ enum: MaterialType })
  @IsEnum(MaterialType)
  type: MaterialType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  pages?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty()
  @IsUrl()
  link: string;

  @ApiProperty()
  @IsUrl()
  download: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty()
  @IsString()
  lessonContentId: string;
}
