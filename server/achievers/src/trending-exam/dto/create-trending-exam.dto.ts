import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTrendingExamDto {
  @ApiProperty({ example: 'CBSE Class X' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'https://tse1.mm.bing.net/th?id=OIP.01lkeHgILmPUDys5kWSr6gHaHa&pid=Api&P=0&h=180'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  image: string;
}