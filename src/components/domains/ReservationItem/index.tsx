import React from "react"
import styled from "@emotion/styled"
import { CourtItem } from "~/components/domains"
import { Spacer } from "~/components/uis/atoms"
import type { APIReservation } from "~/types/domains"
import Loudspeaker from "./Loudspeaker"
import ReservationItemBottom from "./ReservationItemBottom"

interface Props {
  reservation: APIReservation
}

const UpcomingReservations = ({ reservation }: Props) => {
  return (
    <ReservationItem>
      <HeaderContainer>
        <Spacer gap={10} type="vertical">
          <CourtItem.Header>{reservation.court.name}</CourtItem.Header>
          <CourtItem.Datetime
            endDatetime={reservation.endTime}
            startDatetime={reservation.startTime}
          />
        </Spacer>
        <Loudspeaker
          startTime={reservation.startTime}
          courtId={reservation.court.id}
          reservationId={reservation.id}
        />
      </HeaderContainer>

      <Actions gap="xs">
        <CourtItem.FavoritesToggle courtId={reservation.court.id} />
        <CourtItem.Share
          court={{
            id: reservation.court.id,
            name: reservation.court.name,
            latitude: reservation.court.latitude,
            longitude: reservation.court.longitude,
          }}
        />
        <CourtItem.ChatLink
          chatroomId={
            // TODO: Court에 chatroomId 포함시키기
            "1"
          }
        />
        <CourtItem.KakaoMapLink
          latitude={reservation.court.latitude}
          longitude={reservation.court.longitude}
          courtName={reservation.court.name}
          type="findRoad"
        />
      </Actions>
      <ReservationItemBottom
        courtId={reservation.court.id}
        startTime={reservation.startTime}
        endTime={reservation.endTime}
        numberOfReservations={reservation.numberOfReservations}
      />
    </ReservationItem>
  )
}

export default UpcomingReservations

const ReservationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.previousTheme.colors.white};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};
  padding: 20px;
`

const Actions = styled(Spacer)`
  justify-content: flex-end;
  align-items: center;
  margin-top: ${({ theme }) => theme.previousTheme.gaps.sm};
  margin-bottom: ${({ theme }) => theme.previousTheme.gaps.base};
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
