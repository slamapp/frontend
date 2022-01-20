import type { APICommon } from "./common";
import { APICourt } from "./court";

export interface APIFavorite extends APICommon {
  court: Pick<APICourt, "id" | "name" | "latitude" | "longitude">;
}
