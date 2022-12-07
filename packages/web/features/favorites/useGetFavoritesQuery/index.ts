import { useSuspenseQuery } from "@suspensive/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useGetFavoritesQuery = (options?: { enabled: boolean }) =>
  useSuspenseQuery(
    [...key.favorites.all],
    () => api.favorites.getMyFavorites().then(({ data }) => data),
    options ?? { enabled: true }
  )

export default useGetFavoritesQuery
