import type { ValueOf } from '@slam/utility-types'
import type { APICourtChatroom, APIUsersChatroom } from './chatroom'
import type { APILoudspeaker } from './loudspeaker'
import type { OmitAt, Send } from '../abstracts'

export interface APIChat extends Send {
  text: string
  type: ValueOf<typeof chatType>
  loudspeaker?: OmitAt<APILoudspeaker>
  chatroom: OmitAt<APIUsersChatroom> | OmitAt<APICourtChatroom>
}

export const chatType = {
  DEFAULT: 'DEFAULT',
  LOUDSPEAKER: 'LOUDSPEAKER',
} as const
