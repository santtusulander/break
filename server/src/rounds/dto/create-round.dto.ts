import { User } from "src/users/user.entity";

export class CreateRoundDto {
  courseId: number;
  players: User['id'][];
  startHole: number;
  endHole: number;
  mensTee: string;
  womensTee: string;
}