import type { UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useUserProfileQuery = (
  userId: APIUser["id"],
  option: Pick<
    UseQueryOptions<
      Awaited<ReturnType<typeof api.users.getUserProfile>>["data"]
    >,
    "enabled" | "onSuccess"
  >
) =>
  useQuery(
    key.users.otherProfile(userId),
    () => api.users.getUserProfile({ id: userId }).then(({ data }) => data),
    { ...option, suspense: true }
  )

export default useUserProfileQuery
