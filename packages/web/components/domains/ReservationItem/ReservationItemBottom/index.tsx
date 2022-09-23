import { useCallback, useState } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { api } from "~/api"
import { UserListItem } from "~/components/domains"
import { Text, Icon, Button } from "~/components/uis/atoms"
import { useAuthContext } from "~/contexts/hooks"
import type { APICourt, APIReservation } from "~/types/domains"

interface Props {
  courtId: APICourt["id"]
  startTime: APIReservation["startTime"]
  endTime: APIReservation["endTime"]
  numberOfReservations: number
}

const ReservationItemBottom = ({
  courtId,
  startTime,
  endTime,
  numberOfReservations,
}: Props) => {
  const [visible, setVisible] = useState(false)
  const [participants, setParticipants] = useState<
    Awaited<
      ReturnType<typeof api.reservations["getMyReservationParticipants"]>
    >["data"]["participants"]
  >([])

  const handleClick = useCallback(async () => {
    setVisible((prev) => !prev)
    const { data } = await api.reservations.getMyReservationParticipants({
      courtId,
      startTime,
      endTime,
    })
    const { participants } = data
    setParticipants(participants)
  }, [courtId, startTime, endTime])

  const { authProps } = useAuthContext()

  if (!authProps.currentUser) {
    return null
  }

  return (
    <>
      <Container>
        <ParticipantsToggle secondary onClick={handleClick}>
          <Icon name="users" size="sm" />
          <Text>{numberOfReservations}</Text>
        </ParticipantsToggle>
        <Link href={`courts/${courtId}/${startTime.substring(0, 10)}`} passHref>
          <Button>예약 확인하기</Button>
        </Link>
      </Container>
      {visible && (
        <ParticipantList>
          {authProps.currentUser.id &&
            authProps.currentUser.nickname &&
            authProps.currentUser.profileImage && (
              <UserListItem
                user={{
                  id: authProps.currentUser.id,
                  nickname: authProps.currentUser.nickname,
                  profileImage: authProps.currentUser.profileImage,
                }}
              />
            )}
          {participants.map(
            ({ userId, nickname, profileImage, isFollowed }) => (
              <UserListItem
                key={userId}
                isFollowed={isFollowed}
                user={{ id: userId, nickname, profileImage }}
              />
            )
          )}
        </ParticipantList>
      )}
    </>
  )
}

const ParticipantsToggle = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${({ theme }) => theme.previousTheme.colors.gray200};
`

const ParticipantList = styled.div`
  width: 100%;
  padding: 15px 20px;
  margin-top: ${({ theme }) => theme.previousTheme.gaps.base};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};

  background-color: ${({ theme }) => theme.previousTheme.colors.gray200};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ReservationItemBottom
