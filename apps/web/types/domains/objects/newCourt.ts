import type { Keyof } from "~/types/helpers"
import type { Create } from "./abstracts"
import type { APICourt } from "./court"

export type APINewCourt = Create &
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
