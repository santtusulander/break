import { Round } from "src/rounds/round.entity";
import { User } from "src/users/user.entity";

export class UpsertHoleScoreDto {
  player: User['id'];
  holeNumber: number;
  strokes: number;
  round: Round['id'];
}
