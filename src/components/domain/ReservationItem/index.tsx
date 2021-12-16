import React from "react";
import styled from "@emotion/styled";
import { Spacer } from "@components/base";
import CourtItem from "../CourtItem";
import Loudspeaker from "./Loudspeaker";
import ReservationItemBottom from "./ReservationItemBottom";

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

const UpcomingReservations = ({
  reservationId,
  courtId,
  startTime,
  endTime,
  courtName,
  numberOfReservations,
  latitude,
  longitude,
}: any) => {
  return (
    <ReservationItem key={reservationId}>
      <HeaderContainer>
        <Spacer gap={10} type="vertical">
          <CourtItem.Header>{courtName}</CourtItem.Header>
          <CourtItem.Datetime endDatetime={endTime} startDatetime={startTime} />
        </Spacer>
        <Loudspeaker startTime={startTime} />
      </HeaderContainer>

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
      <ReservationItemBottom
        courtId={courtId}
        startTime={startTime}
        numberOfReservations={numberOfReservations}
      />
    </ReservationItem>
  );
};

export default UpcomingReservations;

const ReservationItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.md};
  padding: 20px;
`;

const Actions = styled(Spacer)`
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.gaps.sm};
  margin-bottom: ${({ theme }) => theme.gaps.base};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
