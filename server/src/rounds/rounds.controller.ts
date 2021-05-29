import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { ChangeRoundCourseDto, ChangeRoundPlayersDto } from './dto/edit-round.dto';
import { Round } from './round.entity';
import { RoundHole } from './rounds.interfaces';
import { RoundsService } from './rounds.service';

@Controller('rounds')
export class RoundsController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly roundsService: RoundsService
  ) {}

  @Post()
  async create(@Body() dto: CreateRoundDto): Promise<void> {
    const holes = await this.coursesService.findCourseHoles(dto.courseId)

    const roundHoles: RoundHole[] = holes.reduce((acc, hole) => {
      if (hole.holeNumber >= dto.startHole && hole.holeNumber <= dto.endHole) {
        return [
          ...acc,
          {
            holeNumber: hole.holeNumber,
            holeHCP: hole.holeHCP,
            holePar: hole.holePar,
            strokeHCP: hole.strokeHCP,
          }
        ]
      }
    }, [])

    this.roundsService.create(dto, roundHoles);
  }

  @Put(':id/config')
  editConfig(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRoundDto): Promise<void> {
    return this.roundsService.editConfig(id, dto);
  }

  @Put(':id/course')
  changeCourse(@Param('id', ParseIntPipe) id: number, @Body() dto: ChangeRoundCourseDto): Promise<void> {
    return this.roundsService.changeCourse(id, dto);
  }

  @Put(':id/players')
  changePlayers(@Param('id', ParseIntPipe) id: number, @Body() dto: ChangeRoundPlayersDto): Promise<void> {
    return this.roundsService.changePlayers(id, dto);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Round> {
    return this.roundsService.findOneById(id);
  }
}
