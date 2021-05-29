import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UpsertHoleScoreDto } from './dto/upsert-hole-score.dto';
import { HoleScore } from './holeScore.entity';
import { HoleScoresService } from './holeScores.service';

@Controller('holeScores')
export class HoleScoresController {
  constructor(private readonly holeScoresService: HoleScoresService) {}

  @Post()
  upsert(@Body() dto: UpsertHoleScoreDto): Promise<HoleScore> {
    return this.holeScoresService.upsert(dto);
  }
}
