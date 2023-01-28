import type { ReactNode } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useGetReservationsInfiniteQuery } from "~/features/reservations"
import type { APICourt } from "~/types/domains/objects"
import { Cell, Cursor, MoreCellSensor, VerticalDivider } from "./components"
import { Context } from "./context"
import type { ContextProps } from "./context"
import "dayjs/locale/ko"

dayjs.locale("ko")

const DATE_QUERY_STRING_FORMAT = "YYYY-MM-DD"

interface Props {
  courtId: APICourt["id"]
  date: string
  children: (props: { dates: string[] }) => ReactNode
}

const ReservationTable = ({ courtId, date, children }: Props) => {
  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  const router = useRouter()

  const dayjsToday = dayjs()
  const dayjsDate = {
    Current: dayjs(`${date}`),
    Min: dayjsToday,
    Max: dayjs(dayjsToday.clone()).add(13, "day"),
  }
  const [isNeedToScrollUnderDisabledCell] = useState(
    dayjs(`${date}`).tz("Asia/Seoul").diff(dayjsToday, "m") < 0
  )

  const [dates, setDates] = useState([
    dayjsDate.Current.format(DATE_QUERY_STRING_FORMAT),
  ])
  const vwElementRef = useRef<HTMLDivElement>(null)
  const [tableCellHeight, setTableCellHeight] = useState(
    (vwElementRef.current?.clientWidth || 6) / 6
  )

  useEffect(() => {
    setTableCellHeight((vwElementRef.current?.clientWidth || 6) / 6)
  }, [vwElementRef.current?.clientWidth])

  const isReadyTableCellHeight = tableCellHeight > 10

  const replaceNewDate: ContextProps["replaceNewDate"] = useCallback(
    async (option, callback) => {
      if (
        (option === "subtract" && dayjs(dates[0]).isBefore(dayjsDate.Min)) ||
        (option === "add" &&
          dayjs(dates[dates.length - 1]).isAfter(dayjsDate.Max))
      ) {
        if (typeof callback === "function") {
          callback({ isAddedCells: false })
        }

        return
      }

      if (option === "subtract") {
        setDates((prev) => {
          const subtractedDay = dayjs(prev[0]).subtract(1, "day")
          getReservationsInfiniteQuery.fetchNextPage({
            pageParam: subtractedDay.toISOString(),
          })

          return [subtractedDay.format(DATE_QUERY_STRING_FORMAT), ...prev]
        })
      }
      if (option === "add") {
        setDates((prev) => {
          const addedDay = dayjs(prev[prev.length - 1]).add(1, "day")
          getReservationsInfiniteQuery.fetchNextPage({
            pageParam: addedDay.toISOString(),
          })

          return [...prev, addedDay.format(DATE_QUERY_STRING_FORMAT)]
        })
      }
      if (typeof callback === "function") {
        await callback({ isAddedCells: true })
      }
    },
    [dates, dayjsDate.Max, dayjsDate.Min]
  )

  useEffect(() => {
    if (dayjsDate.Current.isBefore(dayjsDate.Min.subtract(1, "day"))) {
      router.replace(
        `/reservations/courts/${courtId}?date=${dayjsDate.Min.format(
          DATE_QUERY_STRING_FORMAT
        )}`
      )
    }

    if (dayjsDate.Current.isAfter(dayjsDate.Max.add(1, "day"))) {
      router.replace(
        `/reservations/courts/${courtId}?date=${dayjsDate.Max.format(
          DATE_QUERY_STRING_FORMAT
        )}`
      )
    }
  }, [date, courtId, router])

  return (
    <Context.Provider
      value={{
        isNeedToScrollUnderDisabledCell,
        tableCellHeight,
        dates,
        setDates,
        replaceNewDate,
        courtId,
      }}
    >
      <VStack
        ref={vwElementRef}
        w="100%"
        minH="100vh"
        align="stretch"
        position="relative"
        spacing={0}
      >
        {isReadyTableCellHeight ? (
          children({ dates })
        ) : (
          <>readyTableCellHeight is required</>
        )}
      </VStack>
    </Context.Provider>
  )
}

export default ReservationTable

ReservationTable.VerticalDivider = VerticalDivider
ReservationTable.MoreCellSensor = MoreCellSensor
ReservationTable.Cell = Cell
ReservationTable.Cursor = Cursor
