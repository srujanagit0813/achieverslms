import {
    IsString,
    IsEmail,
    Length,
    Matches,
    IsOptional,
  } from 'class-validator';
  import { Match } from '../../utils/match.decorator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

  export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(3, 255)
    fullName: string;
   @ApiProperty()
    @IsEmail()
    email: string;
  @ApiPropertyOptional()
    @IsOptional()
    @Matches(/^\d{10}$/, { message: 'Student phone must be 10 digits' })
    studentPhone?: string;
  @ApiPropertyOptional()
    @IsOptional()
    @Matches(/^\d{10}$/, { message: 'Parent phone must be 10 digits' })
    parentPhone?: string;
  @ApiProperty()
    @IsString()
    @Length(6, 20)
    password: string;
  @ApiProperty()
    @Match('password', { message: 'Passwords do not match' })
    confirmPassword: string;
  
 
   @ApiPropertyOptional({ example: 'uploads/profile/john.jpg' })
  @IsOptional()
  @IsString()
  userImage?: string;

  @ApiPropertyOptional({ example: 'student' })
  @IsOptional()
  @IsString()
  role?: string; 
}