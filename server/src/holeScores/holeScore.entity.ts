import { Round } from 'src/rounds/round.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['player', 'round', 'holeNumber'])
export class HoleScore {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  player: User;

  @ManyToOne(() => Round)
  round: Round;

  @Column()
  strokes: number;

  @Column()
  holeNumber: number;
}
