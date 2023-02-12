import { useMutation } from '@tanstack/react-query'
import { api } from '~/api'

const useFollowCancelMutation = () => {
  return useMutation(api.follows.deleteFollow)
}

export default useFollowCancelMutation
