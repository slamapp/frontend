import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getLocalToken } from "~/utils"

const useGetFavoritesQuery = () => {
  return useQuery(
    [...key.favorites.all],
    () => api.favorites.getMyFavorites().then(({ data }) => data),
    {
      enabled: !!getLocalToken(),
    }
  )
}

export default useGetFavoritesQuery
