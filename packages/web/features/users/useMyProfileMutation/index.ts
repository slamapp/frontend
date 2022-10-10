import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import useCurrentUserQuery from "../useCurrentUserQuery"

const useMyProfileMutation = () => {
  const currentUserQuery = useCurrentUserQuery()
  const queryClient = useQueryClient()

  return useMutation(
    (data: Parameters<typeof api.users.updateMyProfile>[0]) =>
      api.users.updateMyProfile(data).then(({ data }) => data),
    {
      onSuccess: () => {
        if (currentUserQuery.isSuccess) {
          return queryClient.invalidateQueries(
            key.users.myProfile(currentUserQuery.data.id)
          )
        }
      },
    }
  )
}

export default useMyProfileMutation
