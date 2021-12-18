import ReservationItem from "@components/domain/ReservationItem";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";
import { Spacer } from "@components/base";

const Reservations: NextPage = () => {
  const { authProps } = useAuthContext();
  const { reservations: upcomingReservations } = authProps.currentUser;
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const dummyCompletedReservations = [
    {
      reservationId: 3,
      courtId: 4,
      courtName: "영통구민운동장 농구장",
      latitude: 37.5347279,
      longitude: 126.9023882,
      basketCount: 2,
      numberOfReservations: 6,
      startTime: "2021-12-16T05:10:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 5,
      courtId: 5,
      courtName: "관악구민운동장 농구장",
      latitude: 37.5347279,
      longitude: 126.9023882,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },

    {
      reservationId: 9,
      courtId: 6,
      courtName: "관악구민운동장 농구장",
      latitude: 37.5347279,
      longitude: 126.9023882,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

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
          onClick={() => tabClickHandler(1)}
        >
          지난 예약
        </div>
      ),
      tabContent: (
        <Spacer gap="md" type="vertical">
          {dummyCompletedReservations.map((reservation) => (
            <ReservationItem key={reservation.reservationId} {...reservation} />
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
