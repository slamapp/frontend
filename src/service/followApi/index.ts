import type {
  InfiniteScrollResponse,
  InfiniteScrollRequestParams,
} from "~/types/common"
import type { APIUser } from "~/types/domains"
import type { APIFollowing, APIFollower } from "~/types/domains/follow"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const followAPI = {
  getUserFollowings: ({
    id,
    isFirst = false,
    lastId = null,
  }: InfiniteScrollRequestParams<{ id: APIUser["id"] }>): ApiPromise<
    InfiniteScrollResponse<APIFollowing>
  > =>
    authRequest.get(`/follow/${id}/followings`, {
      params: { isFirst, lastId, size: 10 },
    }),
  getUserFollowers: ({
    id,
    isFirst = false,
    lastId = null,
  }: InfiniteScrollRequestParams<{ id: APIUser["id"] }>): ApiPromise<
    InfiniteScrollResponse<APIFollower>
  > =>
    authRequest.get(`/follow/${id}/followers`, {
      params: { isFirst, lastId, size: 10 },
    }),

  postFollow: ({
    receiverId,
  }: {
    receiverId: APIUser["id"]
  }): ApiPromise<void> =>
    authRequest.post(`/notifications/follow`, {}, { params: { receiverId } }),

  deleteFollow: ({
    receiverId,
  }: {
    receiverId: APIUser["id"]
  }): ApiPromise<void> =>
    authRequest.delete(`/notifications/follow`, { params: { receiverId } }),
} as const

export default followAPI
