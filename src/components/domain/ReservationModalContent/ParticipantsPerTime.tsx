import styled from "@emotion/styled";

import { Avatar, Text } from "@components/base";
import { getTimeFromIndex } from "@utils/timeTable";
import * as S from "./style";

const ParticipantsPerTime: React.FC<{ participantsPerBlock: any[] }> = ({
  participantsPerBlock,
}) => {
  return (
    <S.ContentWrapper>
      <Text>함께하는 사람</Text>
      {participantsPerBlock.map(({ index, users }: any) => (
        <ParticipantWithTimeWrapper key={index}>
          <span>{getTimeFromIndex(index)}</span>
          <S.AvatarGroup>
            {users &&
              users.map(({ userId, avatarImgSrc }: any) => (
                <Avatar
                  key={userId}
                  src={avatarImgSrc}
                  shape="circle"
                  size="md"
                />
              ))}
          </S.AvatarGroup>
        </ParticipantWithTimeWrapper>
      ))}
    </S.ContentWrapper>
  );
};

export default ParticipantsPerTime;

const ParticipantWithTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
