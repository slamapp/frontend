import { APIFavorite } from '@slam/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/api'
import key from '~/features/key'

const useCancelFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ favoriteId }: { favoriteId: APIFavorite['id'] }) =>
      api.favorites.deleteFavorite({ favoriteId }).then(({ data }) => data),
    {
      onSuccess: () => queryClient.invalidateQueries(key.favorites.all),
    }
  )
}

export default useCancelFavoriteMutation
