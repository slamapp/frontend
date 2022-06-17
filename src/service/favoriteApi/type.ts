import type { APICourt, APIFavorite, APIUser } from "~/domainTypes/tobe"
import type { ApiPromise } from "~/service/type"

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise<APIFavorite[]>
  createMyFavorite: (courtId: APICourt["id"]) => ApiPromise<{
    favoriteId: APIFavorite["id"]
    courtId: APIFavorite["court"]["id"]
    courtName: APIFavorite["court"]["name"]
    createdAt: string
    updatedAt: string
    userId: APIUser["id"]
  }>
  deleteMyFavorite: (favoriteId: APIFavorite["id"]) => ApiPromise<void>
}
