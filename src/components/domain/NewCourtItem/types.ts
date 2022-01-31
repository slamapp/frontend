import type { StatusKeyUnion, TextureKeyUnion } from "@domainTypes/.";

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
