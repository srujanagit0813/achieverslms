import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty  } from '@nestjs/swagger';
export class VerifyOtpDto {
     @ApiProperty()
  @IsEmail()
  email: string;
 @ApiProperty()
  @IsNotEmpty()
  otp: string;
}
