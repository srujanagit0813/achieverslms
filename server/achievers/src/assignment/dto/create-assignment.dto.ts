import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  downloadLink: string;

  @ApiProperty()
  submitStatus: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  lessonContentId: string;
}
