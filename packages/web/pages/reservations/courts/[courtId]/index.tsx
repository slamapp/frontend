import type { ComponentProps } from "react"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { AnimatePresence, motion } from "framer-motion"
import { ReservationTable } from "~/components/domains"
import { BottomModal, Button, LayerOver, Toast } from "~/components/uis"
import {
  useCreateReservationMutation,
  useGetReservationsInfiniteQuery,
} from "~/features/reservations"
import { withSuspense } from "~/hocs"
import { useScrollContainer } from "~/layouts"
import { withNavigation } from "~/layouts/Layout/navigations"
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
  const theme = useTheme()
  const router = useRouter()
  const { scrollContainerWidth } = useScrollContainer()

  const createReservationMutation = useCreateReservationMutation({ courtId })
  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  const [reservation, setReservation] = useState<{
    courtId: APICourt["id"]
    startTime: Dayjs
    endTime: Dayjs | null
    hasBall: boolean
  } | null>(null)

  const createReservation = ({ hasBall }: { hasBall: boolean }) => {
    if (reservation && reservation.endTime) {
      createReservationMutation.mutate(
        {
          startTime: reservation.startTime.toISOString(),
          endTime: reservation.endTime.toISOString(),
          hasBall,
        },
        {
          onSuccess: () => {
            router.replace("/reservations")
          },
        }
      )
    }
  }

  const clearReservation = () => setReservation(null)

  const handleClickCell = useCallback<
    ComponentProps<typeof ReservationTable.Cell>["onClick"]
  >(
    (cellTime) => {
      let next: typeof reservation = null
      const clickedTime = cellTime.start
      const prev = reservation ? { ...reservation } : null

      // 1. 현 선택 단계
      const isSelectingStartTime = prev === null
      const isSelectingEndTime = !!prev && !!prev.startTime && !prev.endTime
      const isSelectingNew = !!prev && !!prev.startTime && !!prev.endTime

      // 2. 선택 단계별 동작
      if (isSelectingStartTime) {
        next = {
          courtId,
          startTime: clickedTime,
          endTime: null,
          hasBall: false,
        }
      }

      if (isSelectingEndTime) {
        const isBeforeStartTime = clickedTime.isBefore(prev.startTime)
        const isOverMaxHour =
          cellTime.end.diff(prev.startTime, "minute") / 60 > 4 // 4시간을 초과하는 경우

        if (isBeforeStartTime || isOverMaxHour) {
          if (isOverMaxHour) {
            Toast.show("예약시간을 4시간 이하로 해주세요", {
              marginBottom: "bottomNavigation",
            })
          }

          next = { ...prev, startTime: clickedTime }
        } else {
          next = { ...prev, endTime: cellTime.end }
        }
      }

      if (isSelectingNew) {
        next = { ...prev, startTime: clickedTime, endTime: null }
      }

      setReservation(next)
    },
    [courtId, reservation]
  )

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

      <BottomModal>
        <Flex
          flexDir="column"
          justify="space-between"
          p="24px 20px 20px 20px"
          gap="16px"
          bgColor={theme.colors.white}
        >
          <VStack align="stretch">
            <Text fontSize="1xl" fontWeight="bold">
              {!reservation?.startTime || !reservation?.endTime
                ? "예약시간을 먼저 선택하세요"
                : "예약하기를 눌러 확정하세요"}
            </Text>
            <DateInput
              text={reservation?.startTime
                ?.tz("Asia/Seoul")
                .format("YYYY.MM.DD(dd) HH:mm")}
              clear={clearReservation}
              placeHolder="시작시간을 눌러주세요"
            />
            {reservation && (
              <DateInput
                text={reservation?.endTime
                  ?.tz("Asia/Seoul")
                  .format("YYYY.MM.DD(dd) HH:mm")}
                placeHolder="종료시간을 눌러주세요"
                clear={
                  reservation.endTime !== null
                    ? () =>
                        setReservation({
                          ...reservation,
                          endTime: null,
                        })
                    : null
                }
              />
            )}
          </VStack>
          {reservation && (
            <LayerOver
              trigger={({ isOpen, open }) =>
                reservation.endTime && (
                  <Button
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isOpen ? 1 : [1, 1, 1, 1, 1.05, 1, 1.05, 1],
                    }}
                    fullWidth
                    size="lg"
                    onClick={open}
                    disabled={!reservation.endTime}
                  >
                    예약하기
                  </Button>
                )
              }
              layer={({ close, isOpen }) => (
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <Center
                      as={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      pos="fixed"
                      top={0}
                      bottom={0}
                      left={0}
                      right={0}
                      backdropFilter="blur(3px)"
                    >
                      <Box
                        onClick={close}
                        pos="fixed"
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        bgColor="#00000005"
                        zIndex={-1}
                      />
                      <Box
                        width="90%"
                        maxWidth={`${scrollContainerWidth - 60}px`}
                        bgColor="white"
                        borderRadius="16px"
                        p="16px"
                        boxShadow="0 8px 32px -16px #00000020"
                      >
                        <VStack align="stretch" spacing="24px">
                          <Text
                            fontSize="2xl"
                            textAlign="center"
                            fontWeight="bold"
                          >
                            농구공을 가져가나요?
                          </Text>
                          <VStack>
                            <Text fontSize="sm">
                              {"•시작: "}
                              {reservation.startTime
                                .tz("Asia/Seoul")
                                .format("YYYY.MM.DD(dd) HH:mm")}
                            </Text>
                            <Text fontSize="sm">
                              {"•종료: "}
                              {reservation.endTime
                                ?.tz("Asia/Seoul")
                                .format("YYYY.MM.DD(dd) HH:mm")}
                            </Text>
                          </VStack>
                          <VStack align="stretch">
                            <Button
                              fullWidth
                              size="lg"
                              onClick={() =>
                                createReservation({ hasBall: true })
                              }
                            >
                              공을 가져갈게요 🏀 (예약하기)
                            </Button>
                            <Button
                              fullWidth
                              size="lg"
                              onClick={() =>
                                createReservation({ hasBall: false })
                              }
                            >
                              공 없이 몸만 갈게요 (예약하기)
                            </Button>
                            <Button
                              fullWidth
                              size="lg"
                              scheme="white"
                              onClick={() => close()}
                            >
                              닫기
                            </Button>
                          </VStack>
                        </VStack>
                      </Box>
                    </Center>
                  )}
                </AnimatePresence>
              )}
            />
          )}
        </Flex>
      </BottomModal>
    </Flex>
  )
}

const DateInput = ({
  text,
  placeHolder,
  clear,
}: {
  text?: string
  placeHolder?: string
  clear: (() => void) | null
}) => {
  const theme = useTheme()

  return (
    <Flex
      key={text}
      as={motion.div}
      initial={{
        backgroundColor: text ? theme.colors.gray0500 : theme.colors.gray0050,
      }}
      animate={{
        backgroundColor: theme.colors.gray0050,
      }}
      justify="space-between"
      p="8px 16px"
      borderRadius="12px"
    >
      <Text fontSize="1xl" color={text ? undefined : theme.colors.gray0200}>
        {text ?? placeHolder}
      </Text>
      {clear && <Text onClick={clear}>×</Text>}
    </Flex>
  )
}
