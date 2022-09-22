import { http } from "~/api/core"
import type { ListDTO } from "~/types/common"
import type { APICourt, APIFavorite } from "~/types/domains"

export default {
  getMyFavorites: () => http.auth.get<ListDTO<APIFavorite>>("/favorites"),

  createMyFavorite: (courtId: APICourt["id"]) =>
    http.auth.post<Omit<APIFavorite, "court">>("/favorites", { data: courtId }),

  deleteMyFavorite: (favoriteId: APIFavorite["id"]) =>
    http.auth.delete<void>(`/favorites/${favoriteId}`),
} as const
