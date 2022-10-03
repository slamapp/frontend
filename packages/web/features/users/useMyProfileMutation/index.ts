import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { useAuthContext } from "~/contexts/hooks"
import key from "~/features/key"

const useMyProfileMutation = () => {
  const { authProps } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation(
    (data: Parameters<typeof api.users.updateMyProfile>[0]) =>
      api.users.updateMyProfile(data).then(({ data }) => data),
    {
      onSuccess: () => {
        if (authProps.currentUser) {
          queryClient.invalidateQueries(
            key.users.myProfile(authProps.currentUser.id)
          )
        }
      },
    }
  )
}

export default useMyProfileMutation
