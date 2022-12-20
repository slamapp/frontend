import type { Keyof } from "~/types/helpers"
import type { Default } from "./abstracts"
import type { APIChat } from "./chat"
import type { APICourt } from "./court"
import type { APIUser } from "./user"

export interface APIChatRoom extends Default {
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
