import type { ApiPromise } from "~/service/type"
import type { APICourt, APIFavorite } from "~/types/domains"

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise<APIFavorite[]>
  createMyFavorite: (
    courtId: APICourt["id"]
  ) => ApiPromise<Omit<APIFavorite, "court">>
  deleteMyFavorite: (favoriteId: APIFavorite["id"]) => ApiPromise<void>
}
