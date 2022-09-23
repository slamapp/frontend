import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"
import type { APIUser } from "~/types/domains"

const useMyProfileQuery = (
  userId: APIUser["id"],
  options: UseQueryOptions<
    Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]
  >
) => {
  return useQuery<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>(
    queryKey.users.myProfile(userId),
    async () => {
      const { data } = await api.users.getMyProfile()

      return data
    },
    options
  )
}

export default useMyProfileQuery
