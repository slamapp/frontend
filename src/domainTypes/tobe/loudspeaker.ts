import type { ISOString, OmitAt, SenderObject } from "./common";
import type { Court } from "./court";

export interface Loudspeaker extends SenderObject {
  startTime: ISOString;
  court: OmitAt<Court>;
}
