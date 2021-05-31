import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Club {

  @PrimaryColumn()
  id: string;

  @Column()
  clubName: string;

  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  postCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  faxNumber: string;

  @Column()
  email: string;

  @Column()
  drivingInstructions: string;

  @Column()
  requiredHcp: number;

  @Column()
  status: string;

  @Column()
  abbreviation: string;
}
