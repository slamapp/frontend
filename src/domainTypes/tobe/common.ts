import type { APIUser } from "~/domainTypes/tobe";

export interface APISend extends APICommon {
  sender: OmitAt<APIUser>;
}

export interface APICommon extends APIIdObject {
  createdAt: ISOString;
  updatedAt: ISOString;
}

export interface APIIdObject {
  id: string;
}

export type ISOString = string;
export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
