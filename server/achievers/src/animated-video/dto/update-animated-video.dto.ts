// src/animated-video/dto/update-animated-video.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimatedVideoDto } from './create-animated-video.dto';

export class UpdateAnimatedVideoDto extends PartialType(CreateAnimatedVideoDto) {}
