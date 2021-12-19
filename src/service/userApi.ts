import { EditableUserProfile } from "@contexts/AuthProvider/types";
import { request, authRequest, authFileRequest } from "./fetcher";

const userAPI = {
  getUserData: () => authRequest.get("/users/me"),
  getMyProfile: <R>() => authRequest.get<R, R>("/users/myprofile"),
  getUserProfile: <R>(userId: number) =>
    authRequest.get<R, R>(`/users/${userId}`),
  updateUserProfile: <R>(data: EditableUserProfile) =>
    authRequest.put<R, R>("/users/myprofile", data),
};

export default userAPI;
