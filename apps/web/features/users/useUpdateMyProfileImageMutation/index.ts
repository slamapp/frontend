import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/api'
import key from '~/features/key'

const useUpdateMyProfileImageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(api.users.updateMyProfileImage, {
    onSuccess: () => {
      return queryClient.invalidateQueries(key.users.myProfile())
    },
  })
}

export default useUpdateMyProfileImageMutation
