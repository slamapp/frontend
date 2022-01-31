import type { APICommon, OmitAt, APICourt } from "@domainTypes/tobe";

export interface APIReservation extends APICommon<string> {
  numberOfReservations: number;
  startTime: string;
  endTime: string;
  court: OmitAt<APICourt>;
}
