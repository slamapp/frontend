import { useInfiniteQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { api } from "~/api"
import type { APICourt } from "~/types/domains/objects"
import key from "../key"

type Params = {
  courtId: APICourt["id"]
  initialDate: string
}

export default function useGetReservationsInfiniteQuery({
  courtId,
  initialDate,
}: Params) {
  return useInfiniteQuery(
    key.court(courtId),
    async ({ pageParam: date = dayjs(initialDate).toISOString() }) => {
      const { data } = await api.reservations.getReservationsAtDate({
        courtId,
        date,
      })

      return { ...data, date }
    }
  )
}
