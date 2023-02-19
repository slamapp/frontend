import { useMutation } from '@tanstack/react-query'
import { api } from '~/apis'

const useFollowCreateMutation = () => {
  return useMutation(api.follows.postFollow)
}

export default useFollowCreateMutation
