

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service'; // Adjust the path if needed

@Injectable()
export class AdminService {
  private emails: string[];
  private passwords: string[];
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService, // inject MailService
  ) {
    this.emails = this.config.get<string>('ADMIN_EMAILS')?.split(',') ?? [];
    this.passwords = this.config.get<string>('ADMIN_PASSWORDS')?.split(',') ?? [];
  }

  async loginWithPassword(email: string, password: string): Promise<{ token: string }> {
    const index = this.emails.indexOf(email);
    if (index === -1 || this.passwords[index] !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({ email });
    return { token };
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    if (!this.emails.includes(email)) {
      throw new UnauthorizedException('Unauthorized email');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000;

    this.otpStore.set(email, { otp, expiresAt: expiry });

    await this.mailService.sendEmail({
      to: email,
      subject: 'Your Admin OTP',
      text: `Your OTP is: ${otp}`,
    });

    return { message: 'OTP sent to email' };
  }

  async verifyOtp(email: string, otp: string): Promise<{ token: string }> {
    const record = this.otpStore.get(email);
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      this.otpStore.delete(email);
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    this.otpStore.delete(email);
    const token = await this.jwtService.signAsync({ email });
    return { token };
  }


 async getProfile(email: string) {
    return { email, role: 'admin' };
  }
}