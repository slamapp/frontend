import { request, authRequest, authFileRequest } from "../fetcher";
import type { FavoriteApi } from "./type";

const favoriteAPI: FavoriteApi = {
  getMyFavorites: () => authRequest.get("/favorites"),

  createMyFavorite: (courtId: number) =>
    authRequest.post("/favorites", { courtId }),

  deleteMyFavorite: (favoriteId: number) =>
    authRequest.delete(`/favorites/${favoriteId}`),
};

export default favoriteAPI;
