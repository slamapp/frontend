import { APICourt, APIFavorite, List } from '@slam/types'
import { http } from '~/api/core'

export default {
  getMyFavorites: () => http.get<List<APIFavorite>>('/favorites'),

  createFavorite: ({ courtId }: { courtId: APICourt['id'] }) =>
    http.post<Omit<APIFavorite, 'court'>>('/favorites', {
      data: { courtId },
    }),

  deleteFavorite: ({ favoriteId }: { favoriteId: APIFavorite['id'] }) => http.delete<void>(`/favorites/${favoriteId}`),
} as const
