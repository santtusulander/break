import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() dtos: CreateCourseDto[]): Promise<void> {

    return this.coursesService.bulkCreate(dtos);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @Get(':partialName')
  findOneByName(@Param('partialName') partialName: string): Promise<Course> {
    return this.coursesService.findOneByName(partialName);
  }
}
