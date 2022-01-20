import { StatusKey } from "enums/.";
import { APICourt } from "./court";

export interface APINewCourt extends APICourt {
  status: StatusKey;
}
