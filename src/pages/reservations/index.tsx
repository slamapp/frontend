import { NextPage } from "next";
import React, { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import reservationAPI from "@service/reservationApi";
import ReservationItem from "@components/domain/ReservationItem";
import { Spacer } from "@components/base";

const Reservations: NextPage = () => {
  const { authProps, getMyReservations } = useAuthContext();
  const { reservations: upcomingReservations } = authProps.currentUser;
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);
  useEffect(() => {
    getMyReservations();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expiredReservations, setExpiredReservations] = useState<any[]>();
  const [currentLastId, setCurrentLastId] = useState();

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const expiredHandleClick = useCallback(async () => {
    setActiveIndex(1);
    const { contents, lastId } = await reservationAPI.getMyExpiredReservations(
      currentLastId
    );

    setExpiredReservations(contents);
    setCurrentLastId(lastId);
  }, [currentLastId]);

  const menuTab = [
    {
      tabTitle: (
        <div
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          다가올 예약
        </div>
      ),
      tabContent: (
        <Spacer gap="md" type="vertical">
          {upcomingReservations.map((reservation) => (
            <ReservationItem key={reservation.reservationId} {...reservation} />
          ))}
        </Spacer>
      ),
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={expiredHandleClick}
        >
          지난 예약
        </div>
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
    <Container>
      <TabStyle>
        {menuTab.map((section) => {
          return section.tabTitle;
        })}
      </TabStyle>
      <div>{menuTab[activeIndex].tabContent}</div>
    </Container>
  );
};

const TabStyle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  .is-active {
    font-weight: bold;
  }
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.gaps.base};
`;

export default Reservations;
