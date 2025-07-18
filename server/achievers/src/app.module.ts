import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

import { AnimatedVideoModule } from './animated-video/animated-video.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { LessonModule } from './lesson/lesson.module';
import { LessonContentModule } from './lesson-content/lesson-content.module';

@Module({
  imports: [PrismaModule,
    UserModule,
   CourseModule,
   InstructorModule,
   LessonModule,
    AnimatedVideoModule,
    LessonContentModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
