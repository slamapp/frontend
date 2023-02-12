import { ComponentProps, useCallback, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { Suspense, withSuspense } from '@suspensive/react'
import { useQueryClient } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { ReservationTable } from '~/components/domains'
import { BottomModal, Button, LayerOver, Toast } from '~/components/uis'
import { key } from '~/features'
import { useCreateReservationMutation, useGetReservationsInfiniteQuery } from '~/features/reservations'
import { useScrollContainer } from '~/layouts'
import { Navigation } from '~/layouts/Layout/navigations'
import { APICourt } from '~/types/domains/objects'

type Props = { courtId: string; date: string }
export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => ({
  props: {
    date: query.date as string,
    courtId: query.courtId as string,
  },
})
const Page: NextPage<Props> = (props) => (
  <Navigation
    top={{
      isBack: true,
      title: props.date,
    }}
  >
    <Suspense.CSROnly>
      <Contents {...props} />
    </Suspense.CSROnly>
  </Navigation>
)
export default Page

const Contents = ({ courtId, date }: Props) => {
  const theme = useTheme()
  const router = useRouter()
  const scrollContainer = useScrollContainer()
  const queryClient = useQueryClient()

  const createReservationMutation = useCreateReservationMutation(courtId)
  const getReservationsInfiniteQuery = useGetReservationsInfiniteQuery({
    courtId,
    initialDate: date,
  })

  const [reservation, setReservation] = useState<{
    courtId: APICourt['id']
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
          onSuccess: async () => {
            await queryClient.resetQueries(key.reservations.upcoming())
            await router.replace('/reservations')
            Toast.show('성공적으로 예약했어요', {
              status: 'success',
              marginBottom: 'bottomNavigation',
            })
          },
        }
      )
    }
  }

  const clearReservation = () => setReservation(null)

  const handleClickCell = useCallback<ComponentProps<typeof ReservationTable.Cell>['onClick']>(
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
        const isOverMaxHour = cellTime.end.diff(prev.startTime, 'minute') / 60 > 4 // 4시간을 초과하는 경우

        if (isBeforeStartTime || isOverMaxHour) {
          if (isOverMaxHour) {
            Toast.show('예약시간을 4시간 이하로 해주세요', {
              marginBottom: 'bottomNavigation',
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
            {dates
              .map(
                (date) =>
                  Array.from(Array(48).keys()).map((_, index) => ({
                    timeNumber: index,
                    date,
                  })) // 하루의 표 48개 생성
              )
              .map((cells) =>
                cells.map(({ date, timeNumber }) => (
                  <ReservationTable.Cell
                    key={`${date}-${timeNumber}`}
                    onClick={handleClickCell}
                    timeNumber={timeNumber}
                    date={date}
                  />
                ))
              )}
            <ReservationTable.MoreCellSensor.Bottom />
            {reservation && <ReservationTable.Cursor startTime={reservation.startTime} endTime={reservation.endTime} />}
          </>
        )}
      </ReservationTable>

      <BottomModal>
        <Flex flexDir="column" justify="space-between" p="24px 20px 20px 20px" gap="16px" bgColor={theme.colors.white}>
          <VStack align="stretch">
            <Text fontSize="1xl" fontWeight="bold">
              {!reservation?.startTime || !reservation?.endTime
                ? '예약시간을 먼저 선택하세요'
                : '예약하기를 눌러 확정하세요'}
            </Text>
            <DateInput
              text={reservation ? `${reservation.startTime.tz().format('YYYY.MM.DD(dd) HH:mm')} 부터` : undefined}
              clear={reservation?.startTime ? clearReservation : null}
              placeHolder="시작시간을 눌러주세요"
            />
            {reservation && (
              <DateInput
                text={
                  reservation.endTime ? `${reservation.endTime.tz().format('YYYY.MM.DD(dd) HH:mm')} 까지` : undefined
                }
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
              trigger={(layer) =>
                reservation.endTime && (
                  <Button
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: layer.isOpen ? 1 : [1, 1, 1, 1, 1.05, 1, 1.05, 1],
                    }}
                    fullWidth
                    size="lg"
                    onClick={layer.open}
                    disabled={!reservation.endTime}
                  >
                    예약하기
                  </Button>
                )
              }
              layer={({ close, isOpen }) => (
                <AnimatePresence mode="wait">
                  {isOpen && reservation.endTime && (
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
                        maxWidth={`${scrollContainer.width - 60}px`}
                        bgColor="white"
                        borderRadius="16px"
                        p="16px"
                        boxShadow="0 8px 32px -16px #00000020"
                      >
                        <VStack align="stretch" spacing="24px">
                          <Text fontSize="2xl" textAlign="center" fontWeight="bold">
                            농구공을 가져가나요?
                          </Text>
                          <VStack>
                            <Text fontSize="sm">
                              {'•시작: '}
                              {`${reservation.startTime.tz().format('YYYY.MM.DD(dd) HH:mm')} 부터`}
                            </Text>
                            <Text fontSize="sm">
                              {'•종료: '}
                              {`${reservation.endTime.tz().format('YYYY.MM.DD(dd) HH:mm')} 까지`}
                            </Text>
                          </VStack>
                          <VStack align="stretch">
                            <Button
                              fullWidth
                              size="lg"
                              disabled={createReservationMutation.isLoading}
                              loading={createReservationMutation.isLoading}
                              onClick={() => createReservation({ hasBall: true })}
                            >
                              공을 가져갈게요 🏀 (예약하기)
                            </Button>
                            <Button
                              fullWidth
                              size="lg"
                              disabled={createReservationMutation.isLoading}
                              loading={createReservationMutation.isLoading}
                              onClick={() => createReservation({ hasBall: false })}
                            >
                              공 없이 몸만 갈게요 (예약하기)
                            </Button>
                            <Button fullWidth size="lg" scheme="white" onClick={() => close()}>
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
