import { TextureKey } from "@enums/.";
import type { APICommon } from "./common";

export interface APICourt extends APICommon {
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  basketCount: number;
  texture: TextureKey;
}
