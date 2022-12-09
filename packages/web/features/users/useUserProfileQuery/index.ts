import { useSuspenseQuery } from "@suspensive/react-query"
import { api } from "~/api"
import { key } from "~/features"
import type { APIUser } from "~/types/domains/objects"

const useUserProfileQuery = ({ userId }: { userId: APIUser["id"] }) =>
  useSuspenseQuery(key.users.otherProfile(userId), () =>
    api.users.getUserProfile({ id: userId }).then(({ data }) => data)
  )

export default useUserProfileQuery
