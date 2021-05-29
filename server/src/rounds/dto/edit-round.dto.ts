import { PickType } from "@nestjs/swagger";
import { CreateRoundDto } from "./create-round.dto";

export class EditRoundConfigDto extends PickType(CreateRoundDto, ['endHole', 'mensTee', 'womensTee', 'startHole']) {}
export class ChangeRoundCourseDto extends PickType(CreateRoundDto, ['courseId']) {}
export class ChangeRoundPlayersDto extends PickType(CreateRoundDto, ['players']) {}