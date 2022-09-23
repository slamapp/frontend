import { http } from "~/api/core"
import type {
  InfiniteScrollResponse,
  InfiniteScrollRequestParams,
} from "~/types/common"
import type { APIUser } from "~/types/domains"
import type { APIFollowing, APIFollower } from "~/types/domains/follow"

export default {
  getUserFollowings: ({
    id,
    isFirst = false,
    lastId = null,
  }: InfiniteScrollRequestParams<{ id: APIUser["id"] }>) =>
    http.auth.get<InfiniteScrollResponse<APIFollowing>>(
      `/follow/${id}/followings`,
      {
        params: { isFirst, lastId, size: 10 },
      }
    ),

  getUserFollowers: ({
    id,
    isFirst = false,
    lastId = null,
  }: InfiniteScrollRequestParams<{ id: APIUser["id"] }>) =>
    http.auth.get<InfiniteScrollResponse<APIFollower>>(
      `/follow/${id}/followers`,
      {
        params: { isFirst, lastId, size: 10 },
      }
    ),

  postFollow: ({ receiverId }: { receiverId: APIUser["id"] }) =>
    http.auth.post<void>(`/notifications/follow`, {
      params: { receiverId },
    }),

  deleteFollow: ({ receiverId }: { receiverId: APIUser["id"] }) =>
    http.auth.delete<void>(`/notifications/follow`, { params: { receiverId } }),
} as const
