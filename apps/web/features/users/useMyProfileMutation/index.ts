import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useMyProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: Parameters<typeof api.users.updateMyProfile>[0]) =>
      api.users.updateMyProfile(data).then(({ data }) => data),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(key.users.myProfile())
      },
    }
  )
}

export default useMyProfileMutation
