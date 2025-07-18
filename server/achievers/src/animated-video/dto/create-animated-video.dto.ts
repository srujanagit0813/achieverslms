// src/animated-video/dto/create-animated-video.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnimatedVideoDto {
  @IsString()
  @ApiProperty()
  title: string;
  @ApiProperty()
  @IsString()
  subtitle: string;
 @ApiProperty()
  @IsString()
  buttonText: string;
 @ApiProperty()
  @IsString()
  image: string;
}
