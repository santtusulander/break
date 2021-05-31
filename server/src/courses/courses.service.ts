import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';
import { Hole } from './hole.entity';
import escapeLikeString from 'src/util/escapeLikeString';
import { Club } from 'src/clubs/clubs.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Hole)
    private readonly holesRepository: Repository<Hole>
    ) {}

  async bulkCreate(dtos: CreateCourseDto[]): Promise<void> {

    const courses: Course[] = []
    const holes: Hole[] = []

    dtos.forEach(courseDto => {
      
      const course = new Course();

      course.id = courseDto.courseId;
      course.courseVersion = courseDto.courseVersion;
      course.courseType = courseDto.courseType;
      course.club = {id: courseDto.clubId} as Club;
      course.coordinates = courseDto.coordinates;
      course.courseStatus = courseDto.courseStatus;
      course.courseName = courseDto.courseName;
      course.holesCount = courseDto.holesCount;

      courses.push(course)

      courseDto.holeDTOList.forEach(holeDto => {

        const hole = new Hole();

        hole.id = holeDto.holeId
        hole.course = course
        hole.holeStatus = holeDto.holeStatus
        hole.holeUpdateDate = holeDto.holeUpdateDate
        hole.holeNumber = holeDto.holeNumber
        hole.strokeHCP = holeDto.strokeHCP
        hole.holePar = holeDto.holePar
        hole.holeHCP = holeDto.holeHCP
        hole.holeTees = holeDto.holeTeesDTOList

        holes.push(hole)  
      })
    })
    
    await this.coursesRepository.save(courses);
    await this.holesRepository.save(holes)
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOneById(id: string): Promise<Course> {
    return this.coursesRepository.findOne(id, {relations: ['holes']});
  }

  findCourseHoles(courseId: Course['id']): Promise<Hole[]> {
    return this.holesRepository.find({where: {courseId}});
  }

  findOneByName(name: string): Promise<Course> {
    return this.coursesRepository.findOne({
      courseName: Like(`%${escapeLikeString(name)}%`)},
      {relations: ['holes']}
    );
  }
}
