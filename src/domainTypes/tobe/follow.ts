import type { APISend, OmitAt, APIUser } from "@domainTypes/tobe";

export interface APIFollow extends APISend<string> {
  receiver: OmitAt<APIUser>;
}
