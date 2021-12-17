import { AxiosResponse } from "axios";
import { request, authRequest, authFileRequest } from "./fetcher";

const favoriteAPI = {
  getMyFavorites: <R>() => authRequest.get<R, R>("/favorites"),

  createMyFavorite: <R>(courtId: string) =>
    authRequest.post<R, R>("/favorites", { courtId }),

  deleteMyFavorite: <R>(favoriteId: string) =>
    authRequest.delete<R, R>(`/favorites/${favoriteId}`),
};

export default favoriteAPI;
