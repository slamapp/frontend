import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useUserProfileQuery = (
  userId: APIUser["id"],
  option: UseQueryOptions<
    Awaited<ReturnType<typeof api.users.getUserProfile>>["data"]
  >
) =>
  useQuery<Awaited<ReturnType<typeof api.users.getUserProfile>>["data"]>(
    key.users.otherProfile(userId),
    async () => {
      const { data } = await api.users.getUserProfile({ id: userId })

      return data
    },
    option
  )

export default useUserProfileQuery
