import type { ValueOf } from "../../helpers"
import type { OmitAt } from "../helpers"
import type { Send } from "./abstracts"
import type { APICourtChatroom, APIUsersChatroom } from "./chatroom"
import type { APILoudspeaker } from "./loudspeaker"

export interface APIChat extends Send {
  text: string
  type: ValueOf<typeof chatType>
  loudspeaker?: OmitAt<APILoudspeaker>
  chatroom: OmitAt<APIUsersChatroom> | OmitAt<APICourtChatroom>
}

export const chatType = {
  DEFAULT: "DEFAULT",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const
