import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Round } from 'src/rounds/round.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UpsertHoleScoreDto } from './dto/upsert-hole-score.dto';
import { HoleScore } from './holeScore.entity';

@Injectable()
export class HoleScoresService {
  constructor(
    @InjectRepository(HoleScore)
    private readonly holeScoresRepository: Repository<HoleScore>
  ) {}

  upsert(dto: UpsertHoleScoreDto): Promise<HoleScore> {
    const holeScore = new HoleScore();
    holeScore.strokes = dto.strokes;
    holeScore.holeNumber = dto.holeNumber;
    holeScore.player = {id: dto.player} as User;
    holeScore.round = {id: dto.round} as Round;

    return this.holeScoresRepository.save(holeScore);
  }

  bulkUpsert(dtos: UpsertHoleScoreDto[]): Promise<HoleScore[]> {
    
    const holeScores = dtos.map((dto) => {

      const holeScore = new HoleScore();
      holeScore.strokes = dto.strokes;
      holeScore.holeNumber = dto.holeNumber;
      holeScore.player = {id: dto.player} as User;
      holeScore.round = {id: dto.round} as Round;
      return holeScore
    })

    return this.holeScoresRepository.save(holeScores);
  }

  async findRoundScores(roundId: number): Promise<HoleScore[]> {
    return this.holeScoresRepository.find({where: {roundId}});
  }
}


/* const result = this.holeScoresRepository.createQueryBuilder()
.insert()
.into(HoleScore)
.values(dto)
.onConflict(`("round, player, holeNumber") DO UPDATE SET "strokes" = :strokes`)
.setParameters({strokes: dto.strokes}) */