import type { APIUser } from "./user";

export interface APISend<I = string> extends APICommon<I> {
  sender: APIUser;
}

export interface APICommon<I = number> {
  id: I;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string; // TODO: regex로 ISOString 타입 좁히기

export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
