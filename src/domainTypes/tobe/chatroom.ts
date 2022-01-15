import type { Chat } from "./chat";
import type { CommonObject } from "./common";
import type { Court } from "./court";
import type { User } from "./users";

export interface Chatroom extends CommonObject {
  admins: Admin[];
  type: ChatroomType;
  court?: Court;
  participants: User[];
  lastChat: Chat;
}

export const chatroomType = {
  USER: "USER",
  GROUP: "GROUP",
  COURT: "COURT",
} as const;

type ChatroomTypeMap = typeof chatroomType;
type ChatroomType = ChatroomTypeMap[keyof ChatroomTypeMap];

export const adminType = {
  OWNER: "OWNER",
  MAINTAINER: "MAINTAINER",
} as const;

type AdminTypeMap = typeof adminType;
type AdminType = AdminTypeMap[keyof AdminTypeMap];

interface Admin {
  id: Pick<User, "id">;
  type: AdminType;
}
