import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import { Button, Icon, Text } from "@components/base";
import reservationAPI from "@service/reservationApi";
import FollowListItem from "../../FollowListItem";

/*
const dummyParticipants = [
  {
    followId: 3,
    userId: 2,
    nickname: "hey",
    isFollowed: true,
    profileImage: "https://picsum.photos/250/250",
    createdAt: "2021-01-01T12:20:10",
    updatedAt: "2021-01-01T12:20:10",
  },
  {
    userId: 4,
    nickname: "florar",
    isFollowed: false,
    profileImage: "https://a3.com",
    createdAt: "2021-01-01T12:20:10",
    updatedAt: "2021-01-01T12:20:10",
  },
  {
    userId: 5,
    nickname: "jelli",
    isFollowed: false,
    profileImage: "https://a3.com",
    createdAt: "2021-01-01T12:20:10",
    updatedAt: "2021-01-01T12:20:10",
  },
];
*/

const ReservationItemBottom = ({
  courtId,
  startTime,
  endTime,
  numberOfReservations,
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
          {participants.length !== 0 ? (
            participants.map(
              ({ userId, nickname, profileImage, isFollowed }: any) => (
                <FollowListItem
                  key={userId}
                  src={profileImage}
                  isFollowed={isFollowed}
                >
                  {nickname}
                </FollowListItem>
              )
            )
          ) : (
            <Text>함께한 사람이 없었어요 😢</Text>
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
