import type { ApiPromise } from "~/service/type"
import type { ListDTO } from "~/types/common"
import type { APICourt, APIFavorite } from "~/types/domains"

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise<ListDTO<APIFavorite[]>>
  createMyFavorite: (
    courtId: APICourt["id"]
  ) => ApiPromise<Omit<APIFavorite, "court">>
  deleteMyFavorite: (favoriteId: APIFavorite["id"]) => ApiPromise<void>
}
