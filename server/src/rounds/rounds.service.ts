import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/course.entity';
import { Hole } from 'src/courses/hole.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateRoundDto } from './dto/create-round.dto';
import { ChangeRoundCourseDto, ChangeRoundPlayersDto, EditRoundConfigDto } from './dto/edit-round.dto';
import { Round } from './round.entity';
import { RoundHole } from './rounds.interfaces';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private readonly roundsRepository: Repository<Round>,
  ) {}

  async create(dto: CreateRoundDto, roundHoles: RoundHole[]): Promise<Round> {
    const round = new Round();

    round.course = {id: dto.courseId} as Course
    round.players = dto.players.map((id) => ({id})) as User[]
    round.currentHole = dto.startHole
    round.startHole = dto.startHole  
    round.endHole = dto.endHole  
    round.mensTee = dto.mensTee
    round.womensTee = dto.womensTee
    round.holes = roundHoles

    return this.roundsRepository.save(round)
  }
  
  async editConfig(id: Round['id'], dto: EditRoundConfigDto): Promise<void> {
    const round = new Round();
    round.id = id
    round.currentHole = dto.startHole
    round.startHole = dto.startHole  
    round.endHole = dto.endHole  
    round.mensTee = dto.mensTee
    round.womensTee = dto.womensTee

    this.roundsRepository.save(round)
  }

  async changeCourse(id: Round['id'], dto: ChangeRoundCourseDto): Promise<void> {
    const round = new Round();
    round.id = id
    round.course = {id: dto.courseId} as Course

    this.roundsRepository.save(round)
  }

  async changePlayers(id: Round['id'], dto: ChangeRoundPlayersDto): Promise<void> {
    const round = new Round();
    round.id = id
    round.players = dto.players.map((id) => ({id})) as User[]

    this.roundsRepository.save(round)
  }

  findOneById(id: number): Promise<Round> {
    return this.roundsRepository.findOne(id, {relations: ['players', 'holeScores']});
  }
}
