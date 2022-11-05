import type { ComponentProps } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Flex, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { ReservationTable } from "~/components/domains"
import { BottomModal, Button, Toast } from "~/components/uis"
import { useGetReservationsInfiniteQuery } from "~/features/reservations"
import { withSuspense } from "~/hocs"
import { useSetNavigation, withNavigation } from "~/layouts/Layout/navigations"
import type { APICourt } from "~/types/domains/objects"

dayjs.extend(utc)
dayjs.extend(timezone)

const Page = withNavigation(
  {
    top: { isBack: true, title: "" },
    bottom: false,
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
    setNavigation.custom(() =>
      reservation ? (
        <Button scheme="black" onClick={clearReservation}>
          취소
        </Button>
      ) : null
    )
  }, [reservation, setNavigation])

  return (
    <Flex direction="column">
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

      {reservation && (
        <BottomModal isOpen={!!reservation.endTime}>
          <Box p="24px 20px 20px 20px" h="170px">
            <VStack align="stretch">
              <Box>
                {dayjs(reservation.startTime)
                  .tz("Asia/Seoul")
                  .format("YYYY-MM-DDTHH:mm:ssZ[Z]")}
                {" - "}
                {reservation.endTime &&
                  dayjs(reservation.endTime)
                    .add(30, "minute")
                    .tz("Asia/Seoul")
                    .format("YYYY-MM-DDTHH:mm:ssZ[Z]")}
              </Box>
              <Flex flexDir="row-reverse">
                <Button size="lg">예약하기</Button>
              </Flex>
            </VStack>
          </Box>
        </BottomModal>
      )}
    </Flex>
  )
}
