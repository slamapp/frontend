import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import type { APIUser } from "~/types/domains/objects"

const useUserFollowerInfiniteQuery = (
  userId: APIUser["id"],
  options: { enabled: boolean }
) =>
  useInfiniteQuery(
    key.users.oneFollowers(userId),
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.follows.getUserFollowers(userId, pageParam).then(({ data }) => data),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
      ...options,
    }
  )

export default useUserFollowerInfiniteQuery
