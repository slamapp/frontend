import type { APICourt } from '@slam/types'
import { useSuspenseInfiniteQuery } from '@suspensive/react-query'
import dayjs from 'dayjs'
import { api } from '~/apis'
import key from '~/features/key'

const useGetReservationsInfiniteQuery = ({ courtId, initialDate }: { courtId: APICourt['id']; initialDate: string }) =>
  useSuspenseInfiniteQuery(key.reservations.court(courtId), ({ pageParam: date = dayjs(initialDate).toISOString() }) =>
    api.reservations.getReservationsAtDate({ courtId, date }).then(({ data }) => ({ ...data, date }))
  )

export default useGetReservationsInfiniteQuery
