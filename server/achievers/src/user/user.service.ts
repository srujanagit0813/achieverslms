import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async create(data: Prisma.UserCreateInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return this.prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}


  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }


  update(id: number, data: Prisma.UserUpdateInput) {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestException('No update data provided');
  }

  return this.prisma.user.update({
    where: { id },
    data,
  });
}
  

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwtService.signAsync({ id: user.id, email: user.email });
    return { message: 'Login successful', token };
  }

  async sendOtp(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Email not registered');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.oTP.upsert({
      where: { email },
      update: { code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
      create: { email, code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });

    await this.emailService.sendOtp(email, otp);
    return { message: 'OTP sent to email' };
  }

  async loginWithOtp(email: string, otp: string) {
    const record = await this.prisma.oTP.findUnique({ where: { email } });
    if (!record || record.code !== otp || new Date(record.expiresAt) < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }
const user = await this.prisma.user.findUnique({ where: { email } });
if (!user) throw new NotFoundException('User not found');

const token = await this.jwtService.signAsync({ id: user.id, email: user.email });

    return { message: 'OTP login successful', token };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Email not found');

    const token = await this.jwtService.signAsync({ id: user.id, email: user.email }, { expiresIn: '15m' });
    await this.emailService.sendPasswordReset(email, token);
    return { message: 'Password reset link sent to email' };
  }
}
