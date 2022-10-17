import type { ReactNode } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import Cells from "./Cells"
import type { ContextProps } from "./context"
import { ReservationTableContext } from "./context"
import Divider from "./Divider"
import MoreCellSensor from "./MoreCellSensor"
import "dayjs/locale/ko"

dayjs.locale("ko")

const DATE_QUERY_STRING_FORMAT = "YYYY-MM-DD"

interface Props {
  children: ReactNode
}

const ReservationTable = ({ children }: Props) => {
  const router = useRouter()
  const [intersectingTitleCountMap, setIntersectingTitleCountMap] = useState<{
    [date: string]: number
  }>({})

  const dayjsToday = dayjs()
  const dayjsDate = {
    Current: dayjs(`${router.query.date as string}`),
    Min: dayjsToday,
    Max: dayjs(dayjsToday.clone()).add(13, "day"),
  }

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
          await callback({ isAddedCells: false })
        }

        return
      }

      if (option === "subtract") {
        setDates((prev) => [
          dayjs(prev[0]).subtract(1, "day").format(DATE_QUERY_STRING_FORMAT),
          ...prev,
        ])
      }
      if (option === "add") {
        setDates((prev) => [
          ...prev,
          dayjs(prev[prev.length - 1])
            .add(1, "day")
            .format(DATE_QUERY_STRING_FORMAT),
        ])
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
        `/reservations/courts/${
          router.query.courtId as string
        }?date=${dayjsDate.Min.format(DATE_QUERY_STRING_FORMAT)}`
      )
    }

    if (dayjsDate.Current.isAfter(dayjsDate.Max.add(1, "day"))) {
      router.replace(
        `/reservations/courts/${
          router.query.courtId as string
        }?date=${dayjsDate.Max.format(DATE_QUERY_STRING_FORMAT)}`
      )
    }
  }, [router.query.date, router.query.courtId, router])

  return (
    <ReservationTableContext.Provider
      value={{
        intersectingTitleCountMap,
        setIntersectingTitleCountMap,
        tableCellHeight,
        dates,
        setDates,
        replaceNewDate,
      }}
    >
      <VStack
        ref={vwElementRef}
        w="100%"
        minH={30}
        align="stretch"
        position="relative"
        spacing={0}
      >
        {isReadyTableCellHeight ? (
          <>
            <MoreCellSensor.Top />
            {children}
            <MoreCellSensor.Bottom />
          </>
        ) : (
          <>테이블 그리기를 준비중입니다.</>
        )}
      </VStack>
    </ReservationTableContext.Provider>
  )
}

export default ReservationTable

ReservationTable.Divider = Divider
ReservationTable.Cells = Cells
