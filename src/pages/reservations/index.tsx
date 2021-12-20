import { NextPage } from "next";
import React, { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";

import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import { reservationApi } from "@service/.";
import ReservationItem from "@components/domain/ReservationItem";
import { Spacer, Text } from "@components/base";
import { NoItemMessage } from "@components/domain";

const Reservations: NextPage = () => {
  const { authProps, getMyReservations } = useAuthContext();
  const { reservations: upcomingReservations } = authProps.currentUser;
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);
  useEffect(() => {
    getMyReservations();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expiredReservations, setExpiredReservations] = useState<any[]>([]);
  const [currentLastId, setCurrentLastId] = useState();

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
    </PageContainer>
  );
};

const TabStyle = styled.div`
  display: flex;
  justify-content: space-around;
  height: 52px;
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
