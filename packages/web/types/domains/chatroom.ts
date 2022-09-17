import type { APICommon, Keyof } from "~/types/common"
import type { APICourt, APIUser, APIChat } from "~/types/domains"

export interface APIChatRoom extends APICommon {
  admins: Admin[]
  type: Keyof<typeof chatroomType>
  participants: APIUser[]
  lastChat: APIChat
}

export interface APICourtChatroom extends APIChatRoom {
  court: APICourt
}

export type APIUsersChatroom = APIChatRoom

type Admin = {
  id: APIUser["id"]
  type: Keyof<typeof chatroomAdminType>
}

export const chatroomType = {
  USER: "USER",
  GROUP: "GROUP",
  COURT: "COURT",
} as const

export const chatroomAdminType = {
  OWNER: "OWNER",
  MAINTAINER: "MAINTAINER",
} as const
