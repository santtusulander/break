import { Club } from 'src/clubs/clubs.entity';
import { Round } from 'src/rounds/round.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  id: string;

  @Column()
  gender: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column('float')
  hcp: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Round, round => round.players)
  @JoinTable()
  rounds: Round[];

  @ManyToOne(() => Club, {nullable: true})
  club: Club
}
