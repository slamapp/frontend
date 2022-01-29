import type { OmitAt, APISend } from "./common";
import type { APIUser } from "./user";

export interface APIFollow extends APISend<string> {
  receiver: OmitAt<APIUser>;
}
