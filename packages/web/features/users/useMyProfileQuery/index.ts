import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { key } from "~/features"

const useMyProfileQuery = () => {
  return useQuery(
    key.users.myProfile(),
    () => api.users.getMyProfile().then(({ data }) => data),
    {
      suspense: true,
    }
  )
}

export default useMyProfileQuery
