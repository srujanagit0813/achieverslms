// src/mail/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAILS, // your email (from .env)
        pass: process.env.ADMIN_PASSWORDS, // your email password or app password
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Admin Support" <${process.env.ADMIN_EMAILS}>`,
        to,
        subject,
        text,
      });

      Logger.log(`Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      Logger.error('Error sending email:', error);
      return false;
    }
  }
}
