import { Club } from "../clubs.entity";

export class CreateClubDto {
  clubId: Club['id'];
  name: string;
  streetAddress: string;
  city: string;
  postCode: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  drivingInstructions: string;
  requiredHcp: string;
  status: string;
  abbreviation: string;
}
