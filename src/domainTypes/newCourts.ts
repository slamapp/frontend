import type { TextureKeyUnion } from "@domainTypes/.";

export const status = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const;

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
