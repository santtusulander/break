import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoursesModule } from './courses/courses.module';
import { RoundsModule } from './rounds/rounds.module';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import { HoleScoresModule } from './holeScores/holeScores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({logging: true}),
    UsersModule,
    CoursesModule,
    RoundsModule,
    HoleScoresModule,
    ClubsModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
