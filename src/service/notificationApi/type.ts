import type { ApiPromise } from "~/service/type"
import type { APINotification } from "~/types/domains"

export interface NotificationApi {
  getNotifications: (param: {
    size?: number
    lastId?: APINotification["id"] | null
    isFirst?: boolean
  }) => ApiPromise<{
    contents: APINotification[]
    lastId: APINotification["id"] | null
  }>

  readAllNotifications: () => ApiPromise
}
