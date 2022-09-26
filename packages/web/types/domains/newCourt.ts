import type { APICreate, Keyof } from "~/types/common"
import type { APICourt } from "~/types/domains"

export type APINewCourt = APICreate &
  Pick<
    APICourt,
    "basketCount" | "image" | "latitude" | "longitude" | "name" | "texture"
  > & {
    status: Keyof<typeof statusType>
  }

export const statusType = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const
