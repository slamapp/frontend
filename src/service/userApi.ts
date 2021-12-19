import { request, authRequest, authFileRequest } from "./fetcher";

const userAPI = {
  getUserData: () => authRequest.get("/users/me"),
  getMyProfile: <R>() => authRequest.get<R, R>("/users/myprofile"),
  getUserProfile: <R>(userId: number) =>
    authRequest.get<R, R>(`/users/${userId}`),
};

export default userAPI;
