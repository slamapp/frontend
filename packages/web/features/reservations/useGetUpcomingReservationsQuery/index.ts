import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import key from "~/features/key"
import { getLocalToken } from "~/utils"

const useGetUpcomingReservationsQuery = () => {
  return useQuery(
    [...key.reservations.upcoming()],
    () => api.reservations.getMyUpcomingReservations().then(({ data }) => data),
    {
      enabled: !!getLocalToken(),
    }
  )
}

export default useGetUpcomingReservationsQuery
