import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useGetFavoritesQuery = (options?: { enabled: boolean }) => {
  const { enabled = true } = options ?? {}

  return useQuery(
    [...key.favorites.all],
    () => api.favorites.getMyFavorites().then(({ data }) => data),
    {
      enabled,
      suspense: true,
    }
  )
}

export default useGetFavoritesQuery
