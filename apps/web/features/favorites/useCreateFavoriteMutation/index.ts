import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/api'
import key from '~/features/key'
import { APICourt } from '~/types/domains/objects'

const useCreateFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ courtId }: { courtId: APICourt['id'] }) => api.favorites.createFavorite({ courtId }).then(({ data }) => data),
    {
      onSuccess: () => queryClient.invalidateQueries(key.favorites.all),
    }
  )
}

export default useCreateFavoriteMutation
