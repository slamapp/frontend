import type { APIUser } from "@domainTypes/tobe";

export interface APISend<Id = string> extends APICommon<Id> {
  sender: OmitAt<APIUser>;
}

export interface APICommon<Id = number> {
  id: Id;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string; // TODO: regex로 ISOString 타입 좁히기

export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
