import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"
import type { APIUser } from "~/types/domains"

const useUserProfileQuery = (
  userId: APIUser["id"],
  { enabled }: { enabled: boolean }
) =>
  useQuery(
    queryKey.users.otherProfile(userId),
    async () => {
      const { data } = await api.users.getUserProfile({ id: userId })

      return data
    },
    { enabled }
  )

export default useUserProfileQuery
