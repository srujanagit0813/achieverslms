import { Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

//  async create(dto: CreateCourseDto & { imageUrl?: string; videoUrl?: string }) {
//   return this.prisma.course.create({
//     data: {
//       ...dto,
//     },
//   });
// }
async create(dto: CreateCourseDto & { imageUrl?: string; videoUrl?: string }) {
  try {
    const cleanDto = {
      ...dto,
      actualPrice: parseFloat(dto.actualPrice as any),
      discountedPrice: parseFloat(dto.discountedPrice as any),
      rating: parseFloat(dto.rating as any),
      free: dto.free === 'true' || dto.free === true,
    };

    return await this.prisma.course.create({
      data: cleanDto,
    });
  } catch (error) {
    console.error('🔥 Error creating course:', error);
    throw new InternalServerErrorException(error.message);
  }
}



  async findAll() {
    return this.prisma.course.findMany({
      include: {
        instructor: true,
        curriculum: {
          include: {
            items: true,
          },
        },
        reviews: true,
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        curriculum: {
          include: {
            items: true,
          },
        },
        reviews: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  // async update(id: string, dto: UpdateCourseDto) {
  //   await this.findOne(id); // throws if not found
  //   return this.prisma.course.update({
  //     where: { id },
  //     data: dto,
  //   });
  // }

  async update(id: string, dto: any) {
    // Clean null or undefined fields (optional)
    const cleanedDto = Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined && v !== null),
    );

    const existing = await this.prisma.course.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.course.update({
      where: { id },
      data: cleanedDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // throws if not found
    return this.prisma.course.delete({ where: { id } });
  }
}