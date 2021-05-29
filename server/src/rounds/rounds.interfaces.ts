import { Hole } from "src/courses/hole.entity";

export interface RoundHole {
  holeNumber: Hole['holeNumber'],
  holeHCP: Hole['holeHCP'],
  holePar: Hole['holePar'],
  strokeHCP: Hole['strokeHCP'],
}