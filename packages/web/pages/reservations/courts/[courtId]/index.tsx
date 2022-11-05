import type { ComponentProps } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import { ReservationTable } from "~/components/domains"
import { Button, Toast } from "~/components/uis"
import { useGetReservationsInfiniteQuery } from "~/features/reservations"
import { withSuspense } from "~/hocs"
import { useSetNavigation, withNavigation } from "~/layouts/Layout/navigations"
import type { APICourt } from "~/types/domains/objects"

const Page = withNavigation(
  {
    top: { isBack: true, title: "" },
  },
  withSuspense(() => {
    const router = useRouter()
    if (!router.query.courtId || !router.query.date) {
      /* eslint-disable-next-line @typescript-eslint/no-throw-literal */
      throw new Promise((resolve) => {
        if (router.query.courtId && !router.query.date) {
          resolve("suspensed")
        }
      })
    }

    return (
      <Container
        courtId={router.query.courtId as string}
        date={router.query.date as string}
      />
    )
  })
)

export default Page

const Container = ({
  courtId,
  date,
}: {
  courtId: APICourt["id"]
  date: string
}) => {
  const setNavigation = useSetNavigation()

  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  const [reservation, setReservation] = useState<{
    courtId: APICourt["id"]
    startTime: string
    endTime: string | null
    hasBall: boolean
  } | null>(null)

  const clearReservation = () => setReservation(null)

  const handleClickCell: ComponentProps<
    typeof ReservationTable.Cell
  >["onClick"] = ({ date, time }) => {
    const clicked = `${date} ${time}`

    setReservation((prev) => {
      const isFirst = prev === null
      const isSecond = !!prev && !!prev.startTime && !prev.endTime
      const isThird = !!prev && !!prev.startTime && !!prev.endTime

      if (isFirst) {
        return {
          courtId,
          startTime: clicked,
          endTime: null,
          hasBall: false,
        }
      }

      if (isSecond) {
        if (
          dayjs(prev.startTime).isAfter(dayjs(clicked)) ||
          dayjs(clicked)
            .add(30, "minute")
            .diff(dayjs(prev.startTime), "minute") /
            30 >
            8
        ) {
          return {
            ...prev,
            startTime: clicked,
          }
        } else if (prev.startTime === clicked) {
          return prev
        } else {
          return {
            ...prev,
            endTime: clicked,
          }
        }
      }

      if (isThird) {
        return {
          ...prev,
          startTime: clicked,
          endTime: null,
        }
      }

      return null
    })
  }

  useEffect(() => {
    if (reservation) {
      Toast.show(
        `startTime:${reservation.startTime} endTime:${reservation.endTime}`
      )
    }
  }, [reservation])

  useEffect(() => {
    setNavigation.custom(() =>
      reservation ? (
        <Button scheme="black" onClick={clearReservation}>
          취소
        </Button>
      ) : null
    )
  }, [reservation, setNavigation])

  return (
    <ReservationTable courtId={courtId} date={date}>
      {({ dates }) => (
        <>
          <ReservationTable.VerticalDivider />
          <ReservationTable.MoreCellSensor.Top />
          {getReservationsInfiniteQuery.isLoading ? (
            <>loading...</>
          ) : (
            dates
              .map(
                (date) =>
                  Array.from(Array(48).keys()).map((_, index) => ({
                    timeNumber: index,
                    date,
                  })) // 하루의 표 48개 생성
              )
              .map((cells) =>
                cells.map(({ date, timeNumber }) => {
                  return (
                    <ReservationTable.Cell
                      key={`${date}-${timeNumber}`}
                      onClick={handleClickCell}
                      timeNumber={timeNumber}
                      date={date}
                    />
                  )
                })
              )
          )}
          <ReservationTable.MoreCellSensor.Bottom />
          {reservation && (
            <ReservationTable.Cursor
              startTime={reservation.startTime}
              endTime={reservation.endTime}
            />
          )}
        </>
      )}
    </ReservationTable>
  )
}
