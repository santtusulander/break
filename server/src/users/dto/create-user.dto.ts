import { Club } from "src/clubs/clubs.entity";
import { User } from "../user.entity";

export class CreateUserDto {
  firstName: string;
  lastName: string;
  gender: string;
  hcp: number;
  personId: User['id'];
  homeClubId: Club['id'];
}
