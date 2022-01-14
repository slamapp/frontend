import type { Loudspeaker } from "./loudspeaker";
import type { CommonObject } from "./common";
import type { User } from "./users";
import type { Chatroom } from "./chatroom";

export const chatType = {
  DEFAULT: "DEFAULT",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type ChatTypeMap = typeof chatType;
type ChatType = ChatTypeMap[keyof ChatTypeMap];

type Text = string; // TODO: regex로 글자 수 제한하기

export interface Chat extends CommonObject {
  text: Text;
  type: ChatType;
  loudspeaker?: Loudspeaker;
  chatroom: Chatroom;
  sender: User;
}
