import { Course } from 'src/courses/course.entity';
import { HoleScore } from 'src/holeScores/holeScore.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { RoundHole } from './rounds.interfaces';

@Entity()
export class Round {
 
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.id)
  course: Course;

  @OneToMany(() => HoleScore, holeScore => holeScore.id)
  @JoinColumn()
  holeScores: HoleScore[];
  
  @ManyToMany(() => User, user => user.rounds)
  players: User[];
  
  @Column()
  currentHole: number;

  @Column('jsonb')
  holes: RoundHole[];
  
  @Column()
  startHole: number;  
  
  @Column({default: false})
  complete: boolean;

  @Column()
  endHole: number;

  @Column()
  mensTee: string;

  @Column()
  womensTee: string;
}
