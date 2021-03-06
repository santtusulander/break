import { Course } from "../course.entity";
import { Hole } from "../hole.entity";

export class CreateCourseDto {
    courseId: Course['id'];
    courseVersion: string;
    courseType: string;
    clubId: string;
    coordinates: string;
    courseName: string;
    courseStatus: string;
    holesCount: number;
    holeDTOList: {
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
    }[]
}