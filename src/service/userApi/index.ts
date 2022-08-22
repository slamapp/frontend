import type { APICourt, APINotification, APIUser } from "~/types/domains"
import { authRequest, authFileRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const userAPI = {
  getUserData: (): ApiPromise<APIUser & { notifications: APINotification[] }> =>
    authRequest.get("/users/me"),

  getMyProfile: (): ApiPromise<
    APIUser & {
      followerCount: number
      followingCount: number
    }
  > => authRequest.get("/users/myprofile"),

  getUserProfile: ({
    id,
  }: {
    id: APIUser["id"]
  }): ApiPromise<
    APIUser & {
      favoriteCourts: Pick<APICourt, "id" | "name">[]
      followerCount: number
      followingCount: number
      isFollowing: boolean
    }
  > => authRequest.get(`/users/${id}`),

  updateMyProfile: (
    data: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ): ApiPromise<APIUser> => authRequest.put("/users/myprofile", data),

  updateMyProfileImage: (
    editedProfileImageFile: FormData
  ): ApiPromise<{ profileImage: APIUser["profileImage"] }> =>
    authFileRequest.put("/users/myprofile/image", editedProfileImageFile),

  deleteMyProfileImage: (): ApiPromise<{
    profileImage: null
  }> => authRequest.delete("/users/myprofile/image"),
}

export default userAPI
