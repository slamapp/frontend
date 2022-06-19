import type { Keyof } from "~/types/common"
import type { APICourt } from "~/types/domains"

export interface APINewCourt extends APICourt {
  status: Keyof<typeof statusType>
}

export const statusType = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const
