import type { CommonObject } from "./common";

export interface Court extends CommonObject {
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  basketCount: number;
  texture: TextureKey;
}

export const textureType = {
  RUBBER: "고무",
  URETHANE: "우레탄",
  ASPHALT: "아스팔트",
  SOIL: "흙",
  CONCRETE: "콘크리트",
  ETC: "기타",
} as const;

type TextureTypeMap = typeof textureType;

export type TextureValue = TextureTypeMap[keyof TextureTypeMap];
export type TextureKey = keyof TextureTypeMap;
