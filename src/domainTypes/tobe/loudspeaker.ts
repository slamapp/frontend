import type { ISOString, OmitAt, APICommon, APICourt } from "@domainTypes/tobe";

export interface APILoudspeaker extends APICommon<string> {
  startTime: ISOString;
  court: OmitAt<APICourt>;
}
