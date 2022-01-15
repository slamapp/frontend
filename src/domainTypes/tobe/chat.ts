import type { OmitAt, SenderObject } from "./common";
import type { Loudspeaker } from "./loudspeaker";
import type { Chatroom } from "./chatroom";

export interface Chat extends SenderObject {
  text: ChatText;
  type: ChatType;
  loudspeaker?: OmitAt<Loudspeaker>;
  chatroom: OmitAt<Chatroom>;
}

export const chatType = {
  DEFAULT: "DEFAULT",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type ChatTypeMap = typeof chatType;
type ChatType = ChatTypeMap[keyof ChatTypeMap];
type ChatText = string; // TODO: regex로 글자 수 제한하기
