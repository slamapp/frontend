import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { queryKey } from "~/features/queryKey"
import type { APIUser } from "~/types/domains"

const useMyProfileQuery = (
  userId: APIUser["id"],
  { enabled }: { enabled: boolean }
) =>
  useQuery(
    queryKey.users.myProfile(userId),
    async () => {
      const { data } = await api.users.getMyProfile()

      return data
    },
    { enabled }
  )

export default useMyProfileQuery
