import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCoursesDto } from './dto/create-courses.dto';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCoursesDto: CreateCoursesDto): Promise<void> {
    return this.coursesService.bulkCreate(createCoursesDto.courses);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @Get(':partialName')
  findOneByName(@Param('partialName') partialName: string): Promise<Course> {
    return this.coursesService.findOneByName(partialName);
  }
}
