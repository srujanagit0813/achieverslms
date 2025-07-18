import { Module } from '@nestjs/common';
import { AnimatedVideoService } from './animated-video.service';
import { AnimatedVideoController } from './animated-video.controller';

@Module({
  providers: [AnimatedVideoService],
  controllers: [AnimatedVideoController]
})
export class AnimatedVideoModule {}
