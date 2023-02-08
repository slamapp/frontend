import { Fragment } from "react"
import { HStack, VStack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { Delay, Suspense } from "@suspensive/react"
import { NoItemMessage, ReservationItem } from "~/components/domains"
import { InfiniteScrollSensor, Skeleton, Tab } from "~/components/uis"
import {
  useGetExpiredReservationsInfiniteQuery,
  useGetUpcomingReservationsQuery,
} from "~/features/reservations"
import { Navigation } from "~/layouts/Layout/navigations"

const Page = () => (
  <Navigation
    top={{
      title: "예약",
      isNotification: true,
      isProfile: true,
    }}
    bottom
  >
    <div
      css={css`
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 20px;
        padding-top: 16px;
      `}
    >
      <Tab defaultTabName="다가올 예약">
        <Tab.Panel tabName="다가올 예약">
          <VStack align="stretch" spacing="12px">
            <Suspense.CSROnly fallback={<Delay>{fallback}</Delay>}>
              <UpcomingReservations />
            </Suspense.CSROnly>
          </VStack>
        </Tab.Panel>
        <Tab.Panel tabName="지난 예약">
          <VStack align="stretch" spacing="12px">
            <Suspense.CSROnly fallback={<Delay>{fallback}</Delay>}>
              <ExpiredReservations />
            </Suspense.CSROnly>
          </VStack>
        </Tab.Panel>
      </Tab>
    </div>
  </Navigation>
)

export default Page

const UpcomingReservations = () => {
  const getUpcomingReservationsQuery = useGetUpcomingReservationsQuery()

  return getUpcomingReservationsQuery.data.contents.length === 0 ? (
    <NoItemMessage
      title="다가올 예약이 아직 없어요 🤔"
      type="reservation"
      description="농구장에 예약하시고 함께 농구할 사람들을 모으세요"
      buttonTitle="예약할 농구장 찾기"
    />
  ) : (
    <>
      {getUpcomingReservationsQuery.data.contents.map((reservation) => (
        <ReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </>
  )
}

const ExpiredReservations = () => {
  const expiredReservations = useGetExpiredReservationsInfiniteQuery()

  return (
    <>
      {expiredReservations.data.pages.length === 0 && (
        <NoItemMessage
          type="reservation"
          title="지난 예약이 없습니다"
          description="지난 예약 탭에서 지나간 예약들을 모아 보실 수 있어요"
          buttonTitle="지도에서 내 주변 농구장 찾기"
        />
      )}
      {expiredReservations.data.pages.map(({ contents, lastId }, pageIndex) => (
        <Fragment key={pageIndex}>
          {contents.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}

          {expiredReservations.data.pages.length === pageIndex + 1 && lastId && (
            <InfiniteScrollSensor
              onIntersected={() => expiredReservations.fetchNextPage()}
              render={(ref) => (
                <div ref={ref}>
                  <ReservationSkeleton />
                </div>
              )}
            />
          )}
          {expiredReservations.data.pages.length === pageIndex + 1 &&
            !lastId && (
              <NoItemMessage
                type="reservation"
                title="더 받아올 지난 예약이 없습니다"
                description="유용한 정보를 지난 예약에서 모아 보실 수 있어요"
                buttonTitle="지도에서 내 주변 농구장 찾기"
              />
            )}
        </Fragment>
      ))}
    </>
  )
}

const ReservationSkeleton = () => (
  <VStack justify="stretch" align="start" p="16px" spacing="16px">
    <VStack justify="stretch" align="start">
      <Skeleton.Box width={120} height={24} />
      <Skeleton.Box width={90} height={16} />
    </VStack>
    <Skeleton.Box width={42} height={16} />
    <HStack alignSelf="end">
      <Skeleton.Box width={42} height={42} />
      <Skeleton.Box width={42} height={42} />
      <Skeleton.Box width={42} height={42} />
    </HStack>
  </VStack>
)

const fallback = (
  <>
    {Array.from({ length: 5 }).map((_, index) => (
      <ReservationSkeleton key={index} />
    ))}
  </>
)
