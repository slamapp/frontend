import { Avatar, Text } from "@components/base";
import BottomFixedButton from "../BottomFixedButton";
import * as S from "./style";

interface Props {
  startTime: string;
  endTime: string;
  participants: any[];
  availableReservation: boolean;
  snap?: number;
  onStartCreate: () => void;
}

const BlockStatusContent = ({
  startTime,
  endTime,
  participants,
  availableReservation,
  onStartCreate,
  snap,
}: Props) => {
  return (
    <>
      <S.ModalContent>
        <S.ContentWrapper>
          <Text>선택한 시간</Text>
          <S.TimeSlotText>
            {startTime} - {endTime}
          </S.TimeSlotText>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <Text>함께하는 사람들</Text>
          {participants.length === 0 && <Text>아직 참여자가 없습니다.</Text>}
          <S.AvatarGroup>
            {participants.map(({ userId, avatarImgSrc }: any) => (
              <Avatar
                key={userId}
                src={avatarImgSrc}
                shape="circle"
                size="lg"
              />
            ))}
          </S.AvatarGroup>
        </S.ContentWrapper>
      </S.ModalContent>
      {availableReservation && (
        <BottomFixedButton type="button" onClick={onStartCreate} bottom={0}>
          선택한 {startTime}부터 예약하기
        </BottomFixedButton>
      )}
    </>
  );
};

export default BlockStatusContent;
