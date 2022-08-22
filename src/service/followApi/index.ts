import type { InfiniteScrollDTO } from "~/types/common"
import type { APIUser } from "~/types/domains"
import type {
  APIFollowing,
  APIFollower,
  APIFollow,
} from "~/types/domains/follow"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const followAPI = {
  getUserFollowings: ({
    userId,
    isFirst = false,
    lastId = null,
  }:
    | {
        userId: APIUser["id"]
        isFirst: true
        lastId: null
      }
    | {
        userId: APIUser["id"]
        isFirst: false
        lastId: APIFollow["id"]
      }): ApiPromise<InfiniteScrollDTO<APIFollowing>> =>
    authRequest.get(`/follow/${userId}/followings`, {
      params: { isFirst, lastId, size: 10 },
    }),
  getUserFollowers: ({
    userId,
    isFirst = false,
    lastId = null,
  }:
    | {
        userId: APIUser["id"]
        isFirst: true
        lastId: null
      }
    | {
        userId: APIUser["id"]
        isFirst: false
        lastId: APIFollow["id"]
      }): ApiPromise<InfiniteScrollDTO<APIFollower>> =>
    authRequest.get(`/follow/${userId}/followers`, {
      params: { isFirst, lastId, size: 10 },
    }),

  followUser: ({
    receiverId,
  }: {
    receiverId: APIUser["id"]
  }): ApiPromise<null> =>
    authRequest.post(`/notifications/follow`, { receiverId }),
} as const

export default followAPI
