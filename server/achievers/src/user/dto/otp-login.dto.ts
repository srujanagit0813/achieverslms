import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class OtpLoginDto {
 @ApiProperty()
  @IsEmail()
  email: string;
@ApiProperty()
  @IsString()
  otp: string;
}
