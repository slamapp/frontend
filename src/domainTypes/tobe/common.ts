import type { APIUser } from "./user";

export interface APISend extends APICommon {
  sender: APIUser;
}

export interface APICommon {
  id: number;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string; // TODO: regex로 ISOString 타입 좁히기

export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
