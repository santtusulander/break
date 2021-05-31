import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Hole {

  @PrimaryColumn()
  id: string
  
  @ManyToOne(() => Course, course => course.holes)
  course: Course

  @Column()
  holeStatus: string;

  @Column()
  holeUpdateDate: string;

  @Column()
  holeNumber: number;

  @Column()
  strokeHCP: number;

  @Column()
  holePar: number;

  @Column()
  holeHCP: number;

  @Column({type: 'jsonb'})
  holeTees: {
    teeId: string;
    coordinates: string;
    length: number;
    teePar: number;
    teeColorID: string;
    color: string;
    teeColorDescription: string;
    slopeMen: number;
    slopeWomen: number;
    ratingMen: number;
    ratingWomen: number
  }[]
}