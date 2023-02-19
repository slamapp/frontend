import type { Keyof } from '@slam/utility-types'
import type { APIFollow } from './follow'
import type { APILoudspeaker } from './loudspeaker'
import type { Default, OmitAt } from '../abstracts'

export type APINotification = APINotificationFollow | APINotificationLoudspeaker

interface APINotificationFollow extends DefaultNotification {
  type: 'FOLLOW'
  follow: OmitAt<APIFollow>
}

interface APINotificationLoudspeaker extends DefaultNotification {
  type: 'LOUDSPEAKER'
  loudspeaker: OmitAt<APILoudspeaker>
}
interface DefaultNotification extends Default {
  type: Keyof<typeof notificationType>
  isRead: boolean
  isClicked: boolean
}

export const notificationType = {
  FOLLOW: 'FOLLOW',
  LOUDSPEAKER: 'LOUDSPEAKER',
} as const
