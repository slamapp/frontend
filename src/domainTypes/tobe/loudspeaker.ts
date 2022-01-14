import { ISOString, SenderObject } from "./common";
import { Court } from "./courts";

export interface Loudspeaker extends SenderObject {
  startTime: ISOString;
  endTime: ISOString;
  court: Court;
}
