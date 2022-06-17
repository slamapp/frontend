export const chatroomType = {
  USER: "USER",
  GROUP: "GROUP",
  COURT: "COURT",
} as const

type ChatroomTypeMap = typeof chatroomType
export type ChatroomType = ChatroomTypeMap[keyof ChatroomTypeMap]

export const chatroomAdminType = {
  OWNER: "OWNER",
  MAINTAINER: "MAINTAINER",
} as const

type ChatroomAdminTypeMap = typeof chatroomAdminType
export type ChatroomAdminType = ChatroomAdminTypeMap[keyof ChatroomAdminTypeMap]
