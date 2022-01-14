import { CommonObject } from "./common";

export interface Reservation extends CommonObject {
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  basketCount: number;
  numberOfReservations: number;
  startTime: string;
  endTime: string;
}
