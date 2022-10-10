import { http } from "~/api/core"
import type { List } from "~/types/domains/lists"
import type { APICourt, APIFavorite } from "~/types/domains/objects"

export default {
  getMyFavorites: () => http.auth.get<List<APIFavorite>>("/favorites"),

  createFavorite: ({ courtId }: { courtId: APICourt["id"] }) =>
    http.auth.post<Omit<APIFavorite, "court">>("/favorites", {
      data: { courtId },
    }),

  deleteFavorite: ({ favoriteId }: { favoriteId: APIFavorite["id"] }) =>
    http.auth.delete<void>(`/favorites/${favoriteId}`),
} as const
