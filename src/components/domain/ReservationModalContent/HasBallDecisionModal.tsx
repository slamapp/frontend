import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";

import { Button, Text, Spacer } from "@components/base";
import { useReservationContext } from "@contexts/hooks";
import {
  getTimeFromIndex,
  getTimezoneDateStringFromDate,
  week,
} from "@utils/date";
import Modal from "../Modal";
import { DayOfTheWeek } from "..";

interface Props {
  visible: boolean;
  onClose: () => void;
  onDecideBall: (hasBall: boolean) => void;
}

const steps = {
  CONFIRM_RESERVATION: 1,
  DECIDE_BALL: 2,
};

const HasBallDecisionModal = ({ visible, onClose, onDecideBall }: Props) => {
  const {
    reservation: { courtName, startIndex, endIndex, date },
  } = useReservationContext();

  const [step, setStep] = useState(1);

  const handleClickNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleClose = useCallback(() => {
    setStep(1);
    onClose();
  }, [onClose]);

  return (
    <Modal visible={visible} onClose={handleClose}>
      <Spacer gap="xs" type="vertical">
        {step === steps.CONFIRM_RESERVATION && (
          <>
            <Modal.Header strong style={{ paddingBottom: 30 }}>
              예약하시겠습니까?
            </Modal.Header>
            <Content>
              <Spacer gap="xs" type="vertical">
                <Spacer gap="xxs" type="vertical">
                  <Label>선택한 농구장</Label>
                  <Text size="lg">{courtName}</Text>
                </Spacer>
                <Spacer gap="xxs" type="vertical">
                  <Label>선택한 시간</Label>
                  <Spacer gap="xs" style={{ paddingBottom: 40 }}>
                    <Text size="lg">
                      {getTimezoneDateStringFromDate(
                        dayjs(date),
                        undefined,
                        "YYYY년 MM월 DD일"
                      )}{" "}
                      (
                      <DayOfTheWeek index={dayjs(date).day()} size="lg">
                        {week[dayjs(date).day()]}
                      </DayOfTheWeek>
                      ),
                    </Text>

                    <Text size="lg">{`${getTimeFromIndex(
                      startIndex
                    )} - ${getTimeFromIndex(endIndex + 1)}`}</Text>
                  </Spacer>
                </Spacer>
              </Spacer>
              <Modal.BottomButtonContainer>
                <HalfButton size="lg" secondary onClick={handleClose}>
                  닫기
                </HalfButton>
                <HalfButton size="lg" onClick={handleClickNext}>
                  예약하기
                </HalfButton>
              </Modal.BottomButtonContainer>
            </Content>
          </>
        )}

        {step === steps.DECIDE_BALL && (
          <>
            <Modal.Header strong>농구공을 가지고 참여하시나요?</Modal.Header>
            <Spacer gap="xs" type="vertical">
              <Button size="lg" onClick={() => onDecideBall(true)}>
                농구공을 가져가요
              </Button>
              <Button size="lg" onClick={() => onDecideBall(false)}>
                농구공을 가져가지 않아요
              </Button>
            </Spacer>
          </>
        )}
      </Spacer>
    </Modal>
  );
};

export default HasBallDecisionModal;

const HalfButton = styled(Button)`
  flex: 1;
  box-sizing: content-box;
  line-height: 1.3;
`;

const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.gaps.sm};
  margin-bottom: 10px;
`;
