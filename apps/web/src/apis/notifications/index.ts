import type { APINotification, CursorListRequestOption } from '@slam/types'
import type { AxiosPromise } from 'axios'
import { http } from '~/apis/core'

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
