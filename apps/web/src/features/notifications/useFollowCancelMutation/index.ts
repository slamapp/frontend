import { useMutation } from '@tanstack/react-query'
import { api } from '~/apis'

const useFollowCancelMutation = () => {
  return useMutation(api.follows.deleteFollow)
}

export default useFollowCancelMutation
