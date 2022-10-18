import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import { useCurrentUserQuery } from "~/features/users"

const useMyProfileQuery = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>,
    "onSuccess" | "enabled"
  >
) => {
  const currentUserQuery = useCurrentUserQuery()

  return useQuery(
    key.users.myProfile(currentUserQuery.data?.id || "no Id"),
    () => api.users.getMyProfile().then(({ data }) => data),
    {
      enabled: !!currentUserQuery.isSuccess,
      ...options,
      suspense: true,
    }
  )
}

export default useMyProfileQuery
