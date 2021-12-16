import ReservationItem from "@components/domain/ReservationItem";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigationContext } from "@contexts/hooks";
import { Spacer } from "@components/base";

const Reservations: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.RESERVATIONS);

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const dummyUpcomingReservations = [
    {
      reservationId: 3,
      courtId: 1,
      courtName: "영통구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 2,
      numberOfReservations: 6,
      startTime: "2021-12-17T04:10:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 5,
      courtId: 7,
      courtName: "관악구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },

    {
      reservationId: 9,
      courtId: 7,
      courtName: "관악구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
  ];

  const dummyCompletedReservations = [
    {
      reservationId: 3,
      courtId: 1,
      courtName: "영통구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 2,
      numberOfReservations: 6,
      startTime: "2021-12-16T05:10:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },
    {
      reservationId: 5,
      courtId: 7,
      courtName: "관악구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
      basketCount: 4,
      numberOfReservations: 2,
      startTime: "2021-01-01T12:20:10",
      endTime: "2021-01-01T12:20:10",
      createdAt: "2021-01-01T12:20:10",
      updatedAt: "2021-01-01T12:20:10",
    },

    {
      reservationId: 9,
      courtId: 7,
      courtName: "관악구민운동장 농구장",
      latitude: 27.1,
      longitude: 127,
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
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          다가올 예약
        </li>
      ),
      tabContent: (
        <Spacer gap="md" type="vertical">
          {dummyUpcomingReservations.map((reservation) => (
            <ReservationItem key={reservation.reservationId} {...reservation} />
          ))}
        </Spacer>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          지난 예약
        </li>
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
  .is-active {
    color: red;
  }
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.gaps.base};
`;

export default Reservations;
