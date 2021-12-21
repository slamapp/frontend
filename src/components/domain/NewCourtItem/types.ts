const textures = {
  RUBBER: "고무",
  URETHANE: "우레탄",
  ASPHALT: "아스팔트",
  SOIL: "흙",
  CONCRETE: "콘크리트",
  ETC: "기타",
} as const;

const status = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const;

type Texture = typeof textures;
export type TextureValueUnion = Texture[keyof Texture];
export type TextureKeyUnion = keyof Texture;

type Status = typeof status;
export type StatusValueUnion = Status[keyof Status];
export type StatusKeyUnion = keyof Status;

export interface NewCourt {
  newCourtId: number;
  courtName: string;
  basketCount: number;
  longitude: number;
  latitude: number;
  image: string | null;
  texture: TextureKeyUnion | null;
  status: StatusKeyUnion;
  createdAt: string;
}
