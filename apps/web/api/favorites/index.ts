import { http } from '~/api/core'
import { List } from '~/types/domains/lists'
import { APICourt, APIFavorite } from '~/types/domains/objects'

export default {
  getMyFavorites: () => http.get<List<APIFavorite>>('/favorites'),

  createFavorite: ({ courtId }: { courtId: APICourt['id'] }) =>
    http.post<Omit<APIFavorite, 'court'>>('/favorites', {
      data: { courtId },
    }),

  deleteFavorite: ({ favoriteId }: { favoriteId: APIFavorite['id'] }) => http.delete<void>(`/favorites/${favoriteId}`),
} as const
