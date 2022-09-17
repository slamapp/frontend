import type { APICommon, Keyof, OmitAt } from "~/types/common"
import type { APIFollow, APILoudspeaker } from "~/types/domains"

export type APINotification = APINotificationFollow | APINotificationLoudspeaker

interface APINotificationFollow extends DefaultNotification {
  type: "FOLLOW"
  follow: OmitAt<APIFollow>
}

interface APINotificationLoudspeaker extends DefaultNotification {
  type: "LOUDSPEAKER"
  loudspeaker: OmitAt<APILoudspeaker>
}
interface DefaultNotification extends APICommon {
  type: Keyof<typeof notificationType>
  isRead: boolean
  isClicked: boolean
}

export const notificationType = {
  FOLLOW: "FOLLOW",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const
