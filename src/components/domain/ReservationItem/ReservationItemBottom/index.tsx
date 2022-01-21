import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import { Button, Icon, Text } from "@components/base";
import reservationAPI from "@service/reservationApi";
import { useAuthContext } from "@contexts/hooks";
import FollowListItem from "../../FollowListItem";

const ReservationItemBottom = ({
  courtId,
  startTime,
  endTime,
  numberOfReservations,
  expired,
}: any) => {
  const [visible, setVisible] = useState(false);
  const [participants, setParticipants] = useState<any>([]);

  const handleClick = useCallback(async () => {
    setVisible((prev) => !prev);
    const { participants } = await reservationAPI.getMyReservationParticipants({
      courtId,
      startTime,
      endTime,
    });

    setParticipants(participants);
  }, [courtId, startTime, endTime]);

  const {
    authProps: { currentUser },
  } = useAuthContext();
  const { userId, profileImageUrl, notifications } = currentUser;

  return (
    <>
      <Container>
        <ParticipantsToggle secondary onClick={handleClick}>
          <Icon name="users" size="sm" />
          <Text>{numberOfReservations}</Text>
        </ParticipantsToggle>
        {!expired && (
          <Link
            href={`courts/${courtId}/${startTime.substring(0, 10)}`}
            passHref
          >
            <Button>예약 확인하기</Button>
          </Link>
        )}
      </Container>
      {visible && (
        <ParticipantList>
          <FollowListItem src="">me</FollowListItem>
          {participants.map(
            ({ userId, nickname, profileImage, isFollowed }: any) => (
              <FollowListItem
                key={userId}
                src={profileImage}
                isFollowed={isFollowed}
                userId={userId}
              >
                {nickname}
              </FollowListItem>
            )
          )}
        </ParticipantList>
      )}
    </>
  );
};

const ParticipantsToggle = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${({ theme }) => theme.colors.gray200};
`;

const ParticipantList = styled.div`
  width: 100%;
  padding: 15px 20px;
  margin-top: ${({ theme }) => theme.gaps.base};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadiuses.md};

  background-color: ${({ theme }) => theme.colors.gray200};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ReservationItemBottom;
