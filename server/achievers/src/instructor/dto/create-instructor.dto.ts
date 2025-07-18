import { ApiProperty } from '@nestjs/swagger';

export class CreateInstructorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bio: string;
}