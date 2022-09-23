import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"
import type { APIUser } from "~/types/domains"

const useUserProfileQuery = (
  userId: APIUser["id"],
  option: UseQueryOptions<
    Awaited<ReturnType<typeof api.users.getUserProfile>>["data"]
  >
) =>
  useQuery<Awaited<ReturnType<typeof api.users.getUserProfile>>["data"]>(
    queryKey.users.otherProfile(userId),
    async () => {
      const { data } = await api.users.getUserProfile({ id: userId })

      return data
    },
    option
  )

export default useUserProfileQuery
