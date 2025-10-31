import { Building } from "./Building";

export interface AccessRecord {
  id: number;
  user : {
    id: number;
    firstname: string;
    surname:  string;
  }
  time : string;
  building: Building;
  status: boolean;
}