import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getCookieToken } from "~/utils"

const useGetFavoritesQuery = () => {
  return useQuery(
    [...key.favorites.all],
    () => api.favorites.getMyFavorites().then(({ data }) => data),
    {
      enabled: !!getCookieToken(),
      suspense: true,
    }
  )
}

export default useGetFavoritesQuery
