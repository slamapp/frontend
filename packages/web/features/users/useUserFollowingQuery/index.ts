import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useUserFollowingQuery = (userId: APIUser["id"]) =>
  useQuery(
    key.users.oneFollowings(userId as string),
    async () => {
      const { data } = await api.follows.getUserFollowings(userId, {
        isFirst: true,
        lastId: null,
      })

      return data
    },
    { enabled: !!userId }
  )

export default useUserFollowingQuery
