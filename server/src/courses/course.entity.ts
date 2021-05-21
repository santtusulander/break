import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Hole } from './hole.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  courseId: string

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()  
  courseVersion: string;

  @Column()
  createDate: string;

  @Column()
  updateDate: string;

  @Column()
  effectiveDate: string;

  @Column()
  courseStatus: string;

  @Column()
  courseType: string;

  @Column()
  clubId: string;

  @Column()
  coordinates: string;

  @Column()
  courseName: string;

  @Column()
  holesCount: number;

  @OneToMany(type => Hole, hole => hole.course)
  holes: Hole[]
}
