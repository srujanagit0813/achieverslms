import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule,
    UserModule,
    CourseModule,
    CategoriesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
