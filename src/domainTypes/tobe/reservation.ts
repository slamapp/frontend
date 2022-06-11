import type { APICommon, OmitAt, APICourt, APIUser } from "~/domainTypes/tobe";

export interface APIReservation extends APICommon {
  numberOfReservations: number;
  startTime: string;
  endTime: string;
  hasBall: boolean;
  court: OmitAt<APICourt>;
  creator: OmitAt<APIUser>;
}
