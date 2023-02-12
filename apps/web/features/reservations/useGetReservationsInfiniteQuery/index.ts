import { useSuspenseInfiniteQuery } from '@suspensive/react-query'
import dayjs from 'dayjs'
import { api } from '~/api'
import { APICourt } from '~/types/domains/objects'
import key from '../key'

const useGetReservationsInfiniteQuery = ({ courtId, initialDate }: { courtId: APICourt['id']; initialDate: string }) =>
  useSuspenseInfiniteQuery(key.court(courtId), async ({ pageParam: date = dayjs(initialDate).toISOString() }) => {
    const { data } = await api.reservations.getReservationsAtDate({
      courtId,
      date,
    })

    return { ...data, date }
  })

export default useGetReservationsInfiniteQuery
