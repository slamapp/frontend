import type { APISend, OmitAt, ValueOf } from "~/types/common"
import type {
  APILoudspeaker,
  APICourtChatroom,
  APIUsersChatroom,
} from "~/types/domains"

export interface APIChat extends APISend {
  text: ChatText
  type: ValueOf<typeof chatType>
  loudspeaker?: OmitAt<APILoudspeaker>
  chatroom: OmitAt<APIUsersChatroom> | OmitAt<APICourtChatroom>
}

type ChatText = string // TODO: regex로 글자 수 제한하기

export const chatType = {
  DEFAULT: "DEFAULT",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const
