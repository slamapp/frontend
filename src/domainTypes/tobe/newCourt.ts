import { StatusKey } from "enums/.";
import { APICourt } from "./court";

export interface APINewCourt extends Omit<APICourt, "id"> {
  id: string;
  status: StatusKey;
}
