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
import { CurriculumModule } from './curriculum/curriculum.module';
import { CurriculumItemModule } from './curriculum-item/curriculum-item.module';
import { ReviewModule } from './review/review.module';
import { AssignmentModule } from './assignment/assignment.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [PrismaModule,
    UserModule,
    AnimatedVideoModule,
   CourseModule,
   InstructorModule,
   LessonModule,
    
    LessonContentModule,
    CurriculumModule,
  CurriculumItemModule,
  ReviewModule,
  AssignmentModule,
  QuizModule,
  QuizQuestionModule,
  MaterialModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
