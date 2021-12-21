import { NextPage } from "next";
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import { reservationApi } from "@service/.";
import { Spacer, Text } from "@components/base";
import { NoItemMessage, ReservationItem } from "@components/domain";
import UtilRoute from "UtilRoute";
import useInfiniteScroll from "@hooks/useInfiniteScroll";

const Reservations: NextPage = UtilRoute("private", () => {
  const { authProps, getMyReservations } = useAuthContext();
  const { reservations: upcomingReservations } = authProps.currentUser;
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);
  useEffect(() => {
    getMyReservations();
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expiredReservations, setExpiredReservations] = useState<any[]>([]);
  const [currentLastId, setCurrentLastId] = useState<any>();

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const expiredHandleClick = useCallback(async () => {
    setActiveIndex(1);

    if (currentLastId !== null) {
      const { contents, lastId } =
        await reservationApi.getMyExpiredReservations(
          !currentLastId,
          currentLastId
        );

      setExpiredReservations((prev) => [...prev, ...contents]);
      setCurrentLastId(lastId);
    }
  }, [currentLastId]);

  const loadMore = useCallback(async () => {
    if (expiredReservations.length !== 0 && currentLastId !== null) {
      const { contents, lastId } =
        await reservationApi.getMyExpiredReservations(
          !currentLastId,
          currentLastId
        );

      setExpiredReservations((prev) => [...prev, ...contents]);
      setCurrentLastId(lastId);
    }
  }, [currentLastId, expiredReservations]);

  const [isFetching] = useInfiniteScroll(ref, loadMore);

  const menuTab = [
    {
      tabTitle: (
        <Text strong={activeIndex === 0} onClick={() => tabClickHandler(0)}>
          다가올 예약
        </Text>
      ),
      tabContent:
        upcomingReservations.length === 0 ? (
          <NoItemMessage
            title="예약이 아직 없어요 🤔"
            type="reservation"
            description="농구장에 예약하시고 함께 농구할 사람들을 모으세요"
            buttonTitle="예약할 농구장 찾기"
          />
        ) : (
          <Spacer gap="md" type="vertical">
            {upcomingReservations.map((reservation) => (
              <ReservationItem
                key={reservation.reservationId}
                {...reservation}
              />
            ))}
          </Spacer>
        ),
    },
    {
      tabTitle: (
        <Text strong={activeIndex === 1} onClick={expiredHandleClick}>
          지난 예약
        </Text>
      ),
      tabContent: (
        <Spacer gap="md" type="vertical">
          {expiredReservations &&
            expiredReservations.map((reservation: any) => (
              <ReservationItem
                key={reservation.reservationId}
                {...reservation}
              />
            ))}
        </Spacer>
      ),
    },
  ];

  return (
    <PageContainer>
      <TabStyle>
        {menuTab.map((section) => {
          return section.tabTitle;
        })}
      </TabStyle>
      <TabContentsWrapper>{menuTab[activeIndex].tabContent}</TabContentsWrapper>

      <div ref={ref} style={{ height: 20 }}></div>
    </PageContainer>
  );
});

const TabStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 52px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray100};
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 ${({ theme }) => theme.gaps.base};
`;

const TabContentsWrapper = styled.div`
  flex: 1;
`;

export default Reservations;
