import type { OmitAt, APISend } from "./common";
import type { APIUser } from "./user";

export interface APIFollow extends APISend {
  receiver: OmitAt<APIUser>;
}
