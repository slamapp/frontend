import { Fragment } from "react"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Suspense } from "@suspensive/react"
import { NoItemMessage, ReservationItem } from "~/components/domains"
import { InfiniteScrollSensor, Tab } from "~/components/uis"
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
    <PageContainer>
      <Tab defaultTabName="다가올 예약">
        <Tab.Panel tabName="다가올 예약">
          <VStack align="stretch" spacing="12px">
            <UpcomingReservations />
          </VStack>
        </Tab.Panel>
        <Tab.Panel tabName="지난 예약">
          <VStack align="stretch" spacing="12px">
            <Suspense>
              <ExpiredReservations />
            </Suspense>
          </VStack>
        </Tab.Panel>
      </Tab>
    </PageContainer>
  </Navigation>
)

export default Page

const UpcomingReservations = () => {
  const getUpcomingReservationsQuery = useGetUpcomingReservationsQuery()
  if (getUpcomingReservationsQuery.isSuccess) {
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

  return null
}

const ExpiredReservations = () => {
  const expiredReservations = useGetExpiredReservationsInfiniteQuery()

  if (expiredReservations.isSuccess) {
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
        {expiredReservations.data.pages.map(
          ({ contents, lastId }, pageIndex) => (
            <Fragment key={pageIndex}>
              {contents.map((reservation) => (
                <ReservationItem
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
              {expiredReservations.data.pages.length === pageIndex + 1 &&
                lastId && (
                  <InfiniteScrollSensor
                    onIntersected={() => expiredReservations.fetchNextPage()}
                    render={(ref) => (
                      <div ref={ref} style={{ minHeight: 200 }}>
                        sensor
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
          )
        )}
      </>
    )
  }

  return null
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
  padding-top: 16px;
`
