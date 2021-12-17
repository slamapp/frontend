import { Avatar, Text } from "@components/base";
import * as S from "./style";

interface Props {
  startTime: string;
  endTime: string;
  participants: any[];
  availableReservation: boolean;
  onStartCreate: () => void;
}

const BlockStatusContent = ({
  startTime,
  endTime,
  participants,
  availableReservation,
  onStartCreate,
}: Props) => {
  return (
    <S.ModalContent>
      <S.ContentWrapper>
        <Text>선택한 시간</Text>
        <S.TimeSlotText>
          {startTime} - {endTime}
        </S.TimeSlotText>
      </S.ContentWrapper>
      <S.ContentWrapper>
        <Text>함께하는 사람들</Text>
        <S.AvatarGroup>
          {participants.map(({ userId, avatarImgSrc }: any) => (
            <Avatar key={userId} src={avatarImgSrc} shape="circle" />
          ))}
        </S.AvatarGroup>
      </S.ContentWrapper>
      {availableReservation && (
        <button type="button" onClick={onStartCreate}>
          선택한 {startTime}부터 예약하기
        </button>
      )}
    </S.ModalContent>
  );
};

export default BlockStatusContent;
