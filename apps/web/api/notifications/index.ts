import { AxiosPromise } from 'axios'
import { http } from '~/api/core'
import { CursorListRequestOption } from '~/types/domains/lists/CursorList'
import { APINotification } from '~/types/domains/objects'

export default {
  getNotifications: ({ size = 3, lastId, isFirst = false }: CursorListRequestOption<APINotification>) =>
    http.get<{
      contents: APINotification[]
      lastId: APINotification['id'] | null
    }>('/notifications', {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    }),

  readAllNotifications: () => http.put<AxiosPromise>('/notifications/read'),
} as const
