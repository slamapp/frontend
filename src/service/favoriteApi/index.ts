import type { ListDTO } from "~/types/common"
import type { APICourt, APIFavorite } from "~/types/domains"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const favoriteAPI = {
  getMyFavorites: (): ApiPromise<ListDTO<APIFavorite>> =>
    authRequest.get("/favorites"),

  createMyFavorite: (
    courtId: APICourt["id"]
  ): ApiPromise<Omit<APIFavorite, "court">> =>
    authRequest.post("/favorites", { courtId }),

  deleteMyFavorite: (favoriteId: APIFavorite["id"]): ApiPromise<void> =>
    authRequest.delete(`/favorites/${favoriteId}`),
}

export default favoriteAPI
