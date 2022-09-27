import { useRouter } from "next/router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import type { APIUser } from "~/types/domains/objects"

const useUserFollowingInfiniteQuery = () => {
  const { query } = useRouter()

  return useInfiniteQuery(
    key.users.oneFollowers(query.userId as APIUser["id"]),
    ({ pageParam }) =>
      api.follows
        .getUserFollowers(query.userId as APIUser["id"], {
          isFirst: true,
          lastId: null,
        })
        .then(({ data }) => data),
    {
      enabled: !!query.userId,
      getNextPageParam: ({ lastId }) => ({
        isFirst: false,
        lastId,
      }),
    }
  )
}

export default useUserFollowingInfiniteQuery
