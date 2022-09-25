import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import type { APIUser } from "~/types/domains"
import { queryKey } from "../../queryKey"

const useUserFollowingQuery = (userId: APIUser["id"]) =>
  useQuery(
    queryKey.users.oneFollowings(userId as string),
    async () => {
      const { data } = await api.follows.getUserFollowings({
        id: `${userId}`,
        isFirst: true,
        lastId: null,
      })

      return data
    },
    { enabled: !!userId }
  )

export default useUserFollowingQuery
