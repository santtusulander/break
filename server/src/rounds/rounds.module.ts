import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { CoursesService } from 'src/courses/courses.service';
import { Round } from './round.entity';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round]),
    CoursesModule
  ],
  providers: [RoundsService],
  controllers: [RoundsController],
})
export class RoundsModule {}
