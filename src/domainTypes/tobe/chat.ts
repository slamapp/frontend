import { ChatType } from "@enums/.";
import type { OmitAt, APISend } from "./common";
import type { APILoudspeaker } from "./loudspeaker";
import type { APIChatroom } from "./chatroom";

export interface APIChat extends APISend {
  text: ChatText;
  type: ChatType;
  loudspeaker?: OmitAt<APILoudspeaker>;
  chatroom: OmitAt<APIChatroom>;
}
type ChatText = string; // TODO: regex로 글자 수 제한하기
