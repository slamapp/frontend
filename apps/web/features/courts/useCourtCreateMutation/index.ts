import { useMutation } from '@tanstack/react-query'
import { api } from '~/api'

const useCourtCreateMutation = () => {
  return useMutation(api.courts.createNewCourt)
}

export default useCourtCreateMutation
