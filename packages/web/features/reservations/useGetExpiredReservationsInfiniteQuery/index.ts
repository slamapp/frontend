import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useGetExpiredReservationsInfiniteQuery = () =>
  useInfiniteQuery(
    key.reservations.expired(),
    ({ pageParam = { isFirst: true, lastId: null } }) =>
      api.reservations
        .getMyExpiredReservations({ ...pageParam, size: 4 })
        .then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => ({
        isFirst: false,
        lastId: lastPage.lastId,
      }),
    }
  )

export default useGetExpiredReservationsInfiniteQuery
