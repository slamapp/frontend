import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { useAuthContext } from "~/contexts/hooks"
import { key } from "~/features"

const useMyProfileQuery = (
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>,
    "onSuccess" | "enabled"
  >
) => {
  const { authProps } = useAuthContext()

  return useQuery(
    key.users.myProfile(authProps.currentUser?.id || "no Id"),
    () => api.users.getMyProfile().then(({ data }) => data),
    {
      enabled: !!authProps.currentUser?.id,
      ...options,
    }
  )
}

export default useMyProfileQuery
