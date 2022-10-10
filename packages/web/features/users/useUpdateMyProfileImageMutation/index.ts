import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { useCurrentUserQuery } from "~/features/users"

const useUpdateMyProfileImageMutation = () => {
  const currentUserQuery = useCurrentUserQuery()
  const queryClient = useQueryClient()

  return useMutation(api.users.updateMyProfileImage, {
    onSuccess: () => {
      if (currentUserQuery.isSuccess) {
        return queryClient.resetQueries(
          key.users.myProfile(currentUserQuery.data.id)
        )
      }
    },
  })
}

export default useUpdateMyProfileImageMutation
