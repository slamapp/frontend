import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useMyProfileQuery = (
  userId: APIUser["id"],
  options: UseQueryOptions<
    Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]
  >
) => {
  return useQuery<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>(
    key.users.myProfile(userId),
    async () => {
      const { data } = await api.users.getMyProfile()

      return data
    },
    options
  )
}

export default useMyProfileQuery
