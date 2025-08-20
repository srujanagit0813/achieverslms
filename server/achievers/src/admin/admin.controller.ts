import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

   @Post('login')
async login(@Body() dto: LoginAdminDto) {
  return this.adminService.loginWithPassword(dto.email, dto.password);
}

@Post('send-otp')
async sendOtp(@Body() dto: SendOtpDto) {
  return this.adminService.sendOtp(dto.email);
}

@Post('verify-otp')
async verifyOtp(@Body() dto: VerifyOtpDto) {
  return this.adminService.verifyOtp(dto.email, dto.otp);
}


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return this.adminService.getProfile(req.user.email);
  }
}
