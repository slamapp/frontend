import { CommonObject, OmitAt } from "./common";
import { Court } from "./court";

export interface Reservation extends CommonObject {
  numberOfReservations: number;
  startTime: string;
  endTime: string;
  court: OmitAt<Court>;
}
