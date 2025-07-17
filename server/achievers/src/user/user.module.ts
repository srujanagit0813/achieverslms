import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
    PrismaModule, 
    EmailModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' } 
    })  // ✅ Configure JwtModule here
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
