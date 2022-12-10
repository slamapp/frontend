import type {
  UseSuspenseQueryResultOnLoading,
  UseSuspenseQueryResultOnSuccess,
} from "@suspensive/react-query"
import { useSuspenseQuery } from "@suspensive/react-query"
import { api } from "~/api"
import key from "~/features/key"

const queryFn = () =>
  api.reservations.getMyUpcomingReservations().then(({ data }) => data)

type ResultSuccess = UseSuspenseQueryResultOnSuccess<
  Awaited<ReturnType<typeof queryFn>>
>

export function useGetUpcomingReservationsQuery(): ResultSuccess
export function useGetUpcomingReservationsQuery(options: {
  enabled: true
}): ResultSuccess
export function useGetUpcomingReservationsQuery(options: {
  enabled: false
}): UseSuspenseQueryResultOnLoading
export function useGetUpcomingReservationsQuery(options: {
  enabled: boolean
}): UseSuspenseQueryResultOnLoading | ResultSuccess
export function useGetUpcomingReservationsQuery(options?: {
  enabled?: boolean
}) {
  return useSuspenseQuery(key.reservations.upcoming(), queryFn, { ...options })
}
