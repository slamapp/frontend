import { CommonObject } from "./common";

export interface Favorite extends CommonObject {
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
}
