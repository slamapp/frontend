import { useRouter } from "next/router"
import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import { getCookieToken } from "~/utils"

const useCurrentUserQuery = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>,
    "onSuccess"
  >
) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useQuery(
    key.users.currentUser(),
    () => api.users.getUserData().then(({ data }) => data),
    {
      enabled: !!getCookieToken(),
      onError: () => {
        queryClient.invalidateQueries()
        router.push("/")
      },
      ...options,
    }
  )
}

export default useCurrentUserQuery
