import type { AxiosPromise } from "axios"
import { http } from "~/api/core"
import type { CursorListRequestOption } from "~/types/domains/lists/CursorList"
import type { APINotification } from "~/types/domains/objects"

export default {
  getNotifications: ({
    size = 3,
    lastId,
    isFirst = false,
  }: CursorListRequestOption<APINotification>) =>
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
