import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { CourtItem } from "~/components/domains"
import { Spacer } from "~/components/uis"
import type { APIReservation } from "~/types/domains/objects"
import ReservationItemBottom from "./ReservationItemBottom"

interface Props {
  reservation: APIReservation
}

const ReservationItemComponent = ({ reservation }: Props) => {
  const theme = useTheme()

  return (
    <ReservationItem>
      <HeaderContainer>
        <Spacer gap={10}>
          <CourtItem.Header>{reservation.court.name}</CourtItem.Header>
          <CourtItem.Datetime
            endDatetime={reservation.endTime}
            startDatetime={reservation.startTime}
          />
        </Spacer>
      </HeaderContainer>

      <Spacer
        justify="flex-end"
        align="center"
        gap="xs"
        style={{
          margin: `${theme.previousTheme.gaps.sm} 0 ${theme.previousTheme.gaps.base} 0`,
        }}
      >
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
      </Spacer>
      <ReservationItemBottom
        courtId={reservation.court.id}
        startTime={reservation.startTime}
        endTime={reservation.endTime}
        numberOfReservations={reservation.numberOfReservations}
      />
    </ReservationItem>
  )
}

export default ReservationItemComponent

const ReservationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.previousTheme.colors.white};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};
  padding: 20px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
