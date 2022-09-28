import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useMyProfileQuery = (
  userId: APIUser["id"],
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof api.users.getMyProfile>>["data"]>,
    "onSuccess" | "enabled"
  >
) =>
  useQuery(
    key.users.myProfile(userId),
    () => api.users.getMyProfile().then(({ data }) => data),
    { ...options }
  )

export default useMyProfileQuery
