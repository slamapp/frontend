import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useUserProfileQuery = ({ userId }: { userId: APIUser["id"] }) =>
  useQuery(
    key.users.otherProfile(userId),
    () => api.users.getUserProfile({ id: userId }).then(({ data }) => data),
    { suspense: true }
  )

export default useUserProfileQuery
