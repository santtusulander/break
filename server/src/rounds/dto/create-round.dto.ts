import { Course } from "src/courses/course.entity";
import { User } from "src/users/user.entity";

export class CreateRoundDto {
  courseId: Course['id'];
  players: User['id'][];
  startHole: number;
  endHole: number;
  mensTee: string;
  womensTee: string;
}