import { useSuspenseQuery } from "@suspensive/react-query"
import { api } from "~/api"
import key from "~/features/key"

const useGetUpcomingReservationsQuery = () =>
  useSuspenseQuery(key.reservations.upcoming(), () =>
    api.reservations.getMyUpcomingReservations().then(({ data }) => data)
  )

export default useGetUpcomingReservationsQuery
