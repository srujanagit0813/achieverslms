import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Business Studies', description: 'Title of the subject' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Business is success', description: 'Description of the subject' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: '📈', description: 'Emoji icon for the subject' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  icon: string;
}
