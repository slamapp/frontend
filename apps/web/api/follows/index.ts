import { http } from "~/api/core"
import type { CursorList } from "~/types/domains/lists"
import type { CursorListRequestOption } from "~/types/domains/lists/CursorList"
import type { APIUser } from "~/types/domains/objects"
import type { APIFollower, APIFollowing } from "~/types/domains/objects/follow"

export default {
  getUserFollowings: (
    userId: APIUser["id"],
    {
      isFirst = false,
      lastId = null,
      size = 4,
    }: CursorListRequestOption<APIUser>
  ) =>
    http.get<CursorList<APIFollowing>>(`/follow/${userId}/followings`, {
      params: { isFirst, lastId, size },
    }),

  getUserFollowers: (
    userId: APIUser["id"],
    {
      isFirst = false,
      lastId = null,
      size = 4,
    }: CursorListRequestOption<APIUser>
  ) =>
    http.get<CursorList<APIFollower>>(`/follow/${userId}/followers`, {
      params: { isFirst, lastId, size },
    }),

  postFollow: ({ receiverId }: { receiverId: APIUser["id"] }) =>
    http.post<void>(`/notifications/follow`, {
      params: { receiverId },
    }),

  deleteFollow: ({ receiverId }: { receiverId: APIUser["id"] }) =>
    http.delete<void>(`/notifications/follow`, { params: { receiverId } }),
} as const
