import { http } from "~/api/core"
import type { APICourt, APINotification, APIUser } from "~/types/domains"

export default {
  getUserData: () =>
    http.auth.get<APIUser & { notifications: APINotification[] }>("/users/me"),

  getMyProfile: () =>
    http.auth.get<
      APIUser & {
        followerCount: number
        followingCount: number
      }
    >("/users/myprofile"),

  getUserProfile: ({ id }: { id: APIUser["id"] }) =>
    http.auth.get<
      APIUser & {
        favoriteCourts: Pick<APICourt, "id" | "name">[]
        followerCount: number
        followingCount: number
        isFollowing: boolean
      }
    >(`/users/${id}`),

  updateMyProfile: (
    data: Pick<
      APIUser,
      "nickname" | "description" | "proficiency" | "positions"
    >
  ) =>
    http.auth.put<APIUser>("/users/myprofile", {
      data,
    }),

  updateMyProfileImage: (editedProfileImageFile: FormData) =>
    http.authFile.put<{ profileImage: APIUser["profileImage"] }>(
      "/users/myprofile/image",
      {
        data: editedProfileImageFile,
      }
    ),

  deleteMyProfileImage: () =>
    http.auth.delete<{
      profileImage: null
    }>("/users/myprofile/image"),
} as const
