import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const favoriteAPI: Api = {
  getMyFavorites: () => authRequest.get("/favorites"),

  createMyFavorite: (courtId: number) =>
    authRequest.post("/favorites", { courtId }),

  deleteMyFavorite: (favoriteId: number) =>
    authRequest.delete(`/favorites/${favoriteId}`),
};

export default favoriteAPI;
