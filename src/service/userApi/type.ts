import type { ApiPromise } from "~/service/type"
import type { APICourt, APINotification, APIUser } from "~/types/domains"

export interface UserApi {
  getUserData: () => ApiPromise<
    APIUser & {
      notifications: APINotification[]
    }
  >
  getMyProfile: () => ApiPromise<
    APIUser & {
      followerCount: number
      followingCount: number
    }
  >
  getUserProfile: (userId: APIUser["id"]) => ApiPromise<
    APIUser & {
      favoriteCourts: Pick<APICourt, "id" | "name">[]
      followerCount: number
      followingCount: number
      isFollowing: boolean
    }
  >
  updateMyProfile: (
    data: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) => ApiPromise<APIUser>
  updateMyProfileImage: (
    editedProfileImageFile: FormData
  ) => ApiPromise<{ profileImage: APIUser["profileImage"] }>
  deleteMyProfileImage: () => ApiPromise<{
    profileImage: null
  }>
}
