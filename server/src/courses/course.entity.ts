import { Club } from 'src/clubs/clubs.entity';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, Unique, ManyToOne } from 'typeorm';
import { Hole } from './hole.entity';

@Entity()
export class Course {

  @PrimaryColumn()
  id: string

  @Column({ default: true })
  isActive: boolean;

  @Column()  
  courseVersion: string;

  @Column()
  courseStatus: string;

  @Column()
  courseType: string;

  @ManyToOne(() => Club)
  club: Club;

  @Column()
  coordinates: string;

  @Column()
  courseName: string;

  @Column()
  holesCount: number;

  @OneToMany(type => Hole, hole => hole.course)
  holes: Hole[]
}
