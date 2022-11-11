import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useGetUpcomingReservationsQuery = () => {
  return useQuery(key.reservations.upcoming(), () =>
    api.reservations.getMyUpcomingReservations().then(({ data }) => data)
  )
}

export default useGetUpcomingReservationsQuery
