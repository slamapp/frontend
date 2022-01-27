import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import { Button, Icon, Spacer, Text } from "@components/base";
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
    const {
      data: { participants },
    } = await reservationAPI.getMyReservationParticipants({
      courtId,
      startTime,
      endTime,
    });

    setParticipants(participants);
  }, [courtId, startTime, endTime]);

  const {
    authProps: { currentUser },
  } = useAuthContext();
  const { userId, profileImageUrl, nickname } = currentUser;

  return (
    <>
      {!expired && (
        <Spacer gap="xxs" type="horizontal">
          <Link
            href={`courts/${courtId}/${startTime.substring(0, 10)}`}
            passHref
          >
            <Button type="button" size="md" fullWidth={true}>
              예약 취소하기
            </Button>
          </Link>
          <Link
            href={`courts/${courtId}/${startTime.substring(0, 10)}`}
            passHref
          >
            <Button type="button" size="md" fullWidth={true}>
              예약 수정하기
            </Button>
          </Link>
        </Spacer>
      )}
      <ParticipantsToggle secondary onClick={handleClick}>
        <Icon name="users" size="sm" />
        <Text> 함께하는 사용자 보기({numberOfReservations})</Text>
      </ParticipantsToggle>
      {visible && (
        <ParticipantList>
          {userId && (
            <FollowListItem
              userId={userId}
              src={profileImageUrl || "/assets/default_profile.svg"}
            >
              {nickname}
            </FollowListItem>
          )}
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
  justify-content: center;
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

export default ReservationItemBottom;
