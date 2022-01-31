import type { APICommon } from "@domainTypes/tobe";
import type { TextureKey } from "@enums/.";

export interface APICourt extends APICommon {
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  basketCount: number;
  texture: TextureKey;
}
