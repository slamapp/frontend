import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { useAuthContext } from "~/contexts/hooks"
import key from "~/features/key"

const useUpdateMyProfileImageMutation = () => {
  const { authProps } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation(api.users.updateMyProfileImage, {
    onSuccess: () => {
      if (authProps.currentUser) {
        return queryClient.resetQueries(
          key.users.myProfile(authProps.currentUser.id)
        )
      }
    },
  })
}

export default useUpdateMyProfileImageMutation
