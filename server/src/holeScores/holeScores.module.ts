import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoleScore } from './holeScore.entity';
import { HoleScoresController } from './holeScores.controller';
import { HoleScoresService } from './holeScores.service';

@Module({
  imports: [TypeOrmModule.forFeature([HoleScore])],
  providers: [HoleScoresService],
  controllers: [HoleScoresController],
})
export class HoleScoresModule {}
