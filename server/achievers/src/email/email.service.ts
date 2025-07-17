import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendOtp(to: string, otp: string) {
    await this.transporter.sendMail({
      from: `"LMS Auth" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });
  }

  async sendPasswordReset(to: string, token: string) {
    const link = `http://your-frontend-app/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: `"LMS Auth" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Password Reset',
      text: `Click this link to reset your password: ${link}`,
    });
  }
}
