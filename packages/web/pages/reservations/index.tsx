import { useCallback, useEffect, useRef, useState } from "react"
import { Text, VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { api } from "~/api"
import { NoItemMessage, ReservationItem } from "~/components/domains"
import { useGetUpcomingReservationsQuery } from "~/features/reservations"
import { useCurrentUserQuery } from "~/features/users"
import { Navigation } from "~/layouts/Layout/navigations"

const Page = () => {
  const currentUserQuery = useCurrentUserQuery()
  const getUpcomingReservationsQuery = useGetUpcomingReservationsQuery()

  const ref = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "EXPIRED">("UPCOMING")
  const [expiredReservations, setExpiredReservations] = useState<any[]>([])
  const [currentLastId, setCurrentLastId] = useState<any>()

  const handleClickExpiredTab = useCallback(async () => {
    setActiveTab("EXPIRED")

    if (currentLastId !== null) {
      const { data } = await api.reservations.getMyExpiredReservations({
        isFirst: !currentLastId,
        lastId: currentLastId,
      })
      const { contents, lastId } = data
      setExpiredReservations((prev) => [...prev, ...contents])
      setCurrentLastId(lastId)
    }
  }, [currentLastId])

  const loadMore = useCallback(async () => {
    if (expiredReservations.length !== 0 && currentLastId !== null) {
      const { data } = await api.reservations.getMyExpiredReservations({
        isFirst: !currentLastId,
        lastId: currentLastId,
      })
      const { contents, lastId } = data
      setExpiredReservations((prev) => [...prev, ...contents])
      setCurrentLastId(lastId)
    }
  }, [currentLastId, expiredReservations])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore()
          }
        })
      },
      { threshold: 1.0 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, loadMore])

  return currentUserQuery.isSuccess ? (
    <Navigation
      top={{
        title: "예약",
        isNotification: true,
        isProfile: true,
      }}
      bottom
    >
      <PageContainer>
        <TabContainer>
          <Text
            fontWeight={activeTab === "UPCOMING" ? "bold" : undefined}
            onClick={() => setActiveTab("UPCOMING")}
            style={{ cursor: "pointer" }}
          >
            다가올 예약
          </Text>
          <Text
            fontWeight={activeTab === "EXPIRED" ? "bold" : undefined}
            onClick={handleClickExpiredTab}
            style={{ cursor: "pointer" }}
          >
            지난 예약
          </Text>
        </TabContainer>
        <TabContentsWrapper>
          {activeTab === "UPCOMING" &&
          getUpcomingReservationsQuery.isSuccess ? (
            getUpcomingReservationsQuery.data.contents.length === 0 ? (
              <NoItemMessage
                title="다가올 예약이 아직 없어요 🤔"
                type="reservation"
                description="농구장에 예약하시고 함께 농구할 사람들을 모으세요"
                buttonTitle="예약할 농구장 찾기"
              />
            ) : (
              <VStack align="stretch" spacing="8px">
                {getUpcomingReservationsQuery.data.contents.map(
                  (reservation) => (
                    <ReservationItem
                      key={reservation.id}
                      reservation={reservation}
                    />
                  )
                )}
              </VStack>
            )
          ) : expiredReservations.length === 0 ? (
            <NoItemMessage
              title="지난 예약이 아직 없어요 🤔"
              type="reservation"
              description="농구장에 예약하시고 함께 농구할 사람들을 모으세요"
              buttonTitle="예약할 농구장 찾기"
            />
          ) : (
            <VStack align="stretch" spacing="8px">
              {expiredReservations.map((reservation) => (
                <ReservationItem
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </VStack>
          )}
        </TabContentsWrapper>

        <div ref={ref} style={{ height: 20 }} />
      </PageContainer>
    </Navigation>
  ) : null
}

export default Page

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 52px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray0100};
  margin-top: 16px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 20px;
`

const TabContentsWrapper = styled.div`
  flex: 1;
  margin-top: 16px;
`
