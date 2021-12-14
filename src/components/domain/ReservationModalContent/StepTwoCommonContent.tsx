import { Avatar, Text } from "@components/base";
import styled from "@emotion/styled";
import * as S from "./style";

interface Props {
  timeSlot: string;
  participantsPerBlock: any[];
}

const StepTwoModalCommonContent = ({
  timeSlot,
  participantsPerBlock,
}: Props) => {
  return (
    <S.ModalContent>
      <S.ContentWrapper>
        <Text>선택한 시간</Text>
        <Text>{timeSlot}</Text>
      </S.ContentWrapper>
      <S.ContentWrapper>
        <Text>함께하는 사람</Text>
        {participantsPerBlock.map(({ index, users }: any) => (
          <ParticipantWithTimeWrapper key={index}>
            <span>{index}</span>
            <S.AvatarGroup>
              {users.map(({ userId, avatarImgSrc }: any) => (
                <Avatar key={userId} src={avatarImgSrc} shape="circle" />
              ))}
            </S.AvatarGroup>
          </ParticipantWithTimeWrapper>
        ))}
      </S.ContentWrapper>
    </S.ModalContent>
  );
};

export default StepTwoModalCommonContent;

const ParticipantWithTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
