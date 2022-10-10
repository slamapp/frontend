import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import { getLocalToken } from "~/utils"

const useCurrentUserQuery = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>,
    "onSuccess" | "onError"
  >
) => {
  return useQuery(
    key.users.currentUser(),
    () => api.users.getUserData().then(({ data }) => data),
    {
      enabled: !!getLocalToken(),
      ...options,
    }
  )
}

export default useCurrentUserQuery
