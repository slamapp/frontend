import { EditableUserProfile } from "@domainTypes/.";
import { request, authRequest, authFileRequest } from "./fetcher";

const userAPI = {
  getUserData: () => authRequest.get("/users/me"),
  getMyProfile: <R>() => authRequest.get<R, R>("/users/myprofile"),
  getUserProfile: <R>(userId: number) =>
    authRequest.get<R, R>(`/users/${userId}`),
  updateMyProfile: <R>(data: EditableUserProfile) =>
    authRequest.put<R, R>("/users/myprofile", data),
  updateMyProfileImage: <R>(editedProfileImageFile: File) =>
    authFileRequest.put<R, R>("/users/myprofile/image", editedProfileImageFile),
  deleteMyProfileImage: <R>() =>
    authRequest.delete<R, R>("/users/myprofile/image"),
};

export default userAPI;
