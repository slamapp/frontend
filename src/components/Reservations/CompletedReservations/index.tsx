import { type } from "os";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { CourtItem } from "@components/domain";
import { Spacer } from "@components/base";
import Participants from "../Participants";

interface ReserveList {
  reservationId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  numberOfReservations: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

type ReserveLists = ReserveList[];

const CompletedReservations = () => {
  const DummyReserves = [
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
  ];

  return (
    <Spacer gap="md" type="vertical">
      {DummyReserves.map(
        ({
          reservationId,
          courtId,
          startTime,
          endTime,
          courtName,
          numberOfReservations,
          latitude,
          longitude,
        }) => (
          <ReservationItem key={reservationId}>
            <Spacer gap={10} type="vertical">
              <CourtItem.Header>{courtName}</CourtItem.Header>
              <CourtItem.Datetime
                startDatetime={startTime}
                endDatetime={endTime}
              />
            </Spacer>
            <p>{numberOfReservations} / 6 명</p>
            <Actions gap="xs">
              <CourtItem.FavoritesToggle courtId={courtId} />
              <CourtItem.ShareButton />
              <CourtItem.ChatLink courtId={courtId} />
              <CourtItem.KakaoMapLink
                latitude={latitude}
                longitude={longitude}
                courtName={courtName}
              />
            </Actions>
          </ReservationItem>
        )
      )}
    </Spacer>
  );
};

const ReservationItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.md};
  padding: 20px;
`;

export default CompletedReservations;

const Actions = styled(Spacer)`
  margin-top: ${({ theme }) => theme.gaps.sm};
`;
