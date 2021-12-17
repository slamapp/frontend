import { request, authRequest, authFileRequest } from "./fetcher";

const favoriteAPI = {
  getMyFavorites: () => authRequest.get("/favorites"),
};

export default favoriteAPI;
