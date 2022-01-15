import type { User } from "./users";

export interface SenderObject extends CommonObject {
  sender: User;
}

export interface CommonObject {
  id: number;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string; // TODO: regex로 ISOString 타입 좁히기

export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
