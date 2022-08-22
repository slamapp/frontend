import type { APIUser } from "~/types/domains"

export type ValueOf<T> = T[keyof T]
export type Keyof<T> = keyof T

export interface APISend extends APICommon {
  sender: Pick<APIUser, "id" | "nickname" | "profileImage">
}

export interface APICreate extends APICommon {
  creator: Pick<APIUser, "id" | "nickname" | "profileImage">
}

export interface APIReceive extends APICommon {
  receiver: Pick<APIUser, "id" | "nickname" | "profileImage">
}

export interface APICommon extends APIIdObject {
  createdAt: ISOString
  updatedAt: ISOString
}

export interface APIIdObject {
  id: string
}

export type ISOString = string
export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">

export type InfiniteScrollRequestParams<T extends Pick<APICommon, "id">> =
  | (T & { isFirst: true; lastId: null })
  | (T & { isFirst: false; lastId: null })
  | (T & { isFirst: false; lastId: T["id"] })

export interface InfiniteScrollResponse<T extends Pick<APICommon, "id">>
  extends ListDTO<T> {
  lastId: T["id"] | null
}
export interface ListDTO<T> {
  contents: T[]
}
