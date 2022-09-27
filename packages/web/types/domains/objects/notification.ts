import type { Keyof } from "~/types/helpers"
import type { OmitAt } from "../helpers"
import type { Default } from "./abstracts"
import type { APIFollow } from "./follow"
import type { APILoudspeaker } from "./loudspeaker"

export type APINotification = APINotificationFollow | APINotificationLoudspeaker

interface APINotificationFollow extends DefaultNotification {
  type: "FOLLOW"
  follow: OmitAt<APIFollow>
}

interface APINotificationLoudspeaker extends DefaultNotification {
  type: "LOUDSPEAKER"
  loudspeaker: OmitAt<APILoudspeaker>
}
interface DefaultNotification extends Default {
  type: Keyof<typeof notificationType>
  isRead: boolean
  isClicked: boolean
}

export const notificationType = {
  FOLLOW: "FOLLOW",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const
