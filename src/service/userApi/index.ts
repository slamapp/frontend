import { EditableUserProfile } from "@domainTypes/.";
import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const userAPI: Api = {
  getUserData: () => authRequest.get("/users/me"),
  getMyProfile: () => authRequest.get("/users/myprofile"),
  getUserProfile: (userId: number) => authRequest.get(`/users/${userId}`),
  updateMyProfile: (data: EditableUserProfile) =>
    authRequest.put("/users/myprofile", data),
  deleteMyProfileImage: () => authRequest.delete("/users/myprofile/image"),
};

export default userAPI;
