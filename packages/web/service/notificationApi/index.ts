import type { APINotification } from "~/types/domains"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const notificationApi = {
  getNotifications: ({
    size = 3,
    lastId,
    isFirst = false,
  }: {
    size?: number
    lastId?: APINotification["id"] | null
    isFirst?: boolean
  }): ApiPromise<{
    contents: APINotification[]
    lastId: APINotification["id"] | null
  }> =>
    authRequest.get("/notifications", {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    }),

  readAllNotifications: (): ApiPromise =>
    authRequest.put("/notifications/read"),
}

export default notificationApi
