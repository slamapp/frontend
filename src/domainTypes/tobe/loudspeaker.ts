import type { ISOString, OmitAt, APICommon } from "./common";
import type { APICourt } from "./court";

export interface APILoudspeaker extends APICommon {
  startTime: ISOString;
  court: OmitAt<APICourt>;
}
