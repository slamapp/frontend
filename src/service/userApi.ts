import { request, authRequest, authFileRequest } from "./fetcher";

const userAPI = {
  getUserData: () => authRequest.get("/users/me"),
};

export default userAPI;
