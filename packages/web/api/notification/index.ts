import type { AxiosPromise } from "axios"
import { http } from "~/api/core"
import type { APINotification } from "~/types/domains"

export default {
  getNotifications: ({
    size = 3,
    lastId,
    isFirst = false,
  }: {
    size?: number
    lastId?: APINotification["id"] | null
    isFirst?: boolean
  }) =>
    http.auth.get<{
      contents: APINotification[]
      lastId: APINotification["id"] | null
    }>("/notifications", {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    }),

  readAllNotifications: () =>
    http.auth.put<AxiosPromise>("/notifications/read"),
} as const
