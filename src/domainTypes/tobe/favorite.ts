import type { CommonObject } from "./common";
import { Court } from "./court";

export interface Favorite extends CommonObject {
  court: Pick<Court, "id" | "name" | "latitude" | "longitude">;
}
