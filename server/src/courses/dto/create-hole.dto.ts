import { Hole } from "../hole.entity";

export default class CreateHoleDto {
  holeId: Hole['id'];
  holeStatus: string;
  holeUpdateDate: string;
  holeNumber: number;
  strokeHCP: number;
  holePar: number;
  holeHCP: number;
  holeTeesDTOList: {
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