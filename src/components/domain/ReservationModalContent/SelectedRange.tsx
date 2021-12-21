import React, { useCallback, useState } from "react";

import { Spacer, Text } from "@components/base";
import * as S from "./style";
import BottomFixedButton from "../BottomFixedButton";
import HasBallDecisionModal from "./HasBallDecisionModal";
import ParticipantsPerTime from "./ParticipantsPerTime";
import TimeForm from "./TimeForm";

interface Props {
  startTime: string;
  endTime: string | null;
  currentInput: "START" | "END";
  hasBall: boolean;
  buttonText: string;
  requestDisabled: boolean;
  participantsPerBlock: any[];
  onSetCurrentInput: (currentInput: string) => void;
  onChangeHasBall: (hasBall: boolean) => void;
  onSubmit: (hasBall: boolean) => void;
}

const SelectedRangeContent = ({
  startTime,
  endTime,
  currentInput,
  buttonText,
  participantsPerBlock,
  requestDisabled,
  onSetCurrentInput,
  onChangeHasBall,
  onSubmit,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickButton = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleDecideHasBall = useCallback(
    (hasBall: boolean) => {
      setIsModalOpen(false);
      onChangeHasBall(hasBall);
      onSubmit(hasBall);
    },
    [onChangeHasBall, onSubmit]
  );

  return (
    <>
      <S.ModalContent>
        <Spacer gap="xs" type="vertical">
          <Text>선택한 시간</Text>
          <TimeForm
            onSetCurrentInput={onSetCurrentInput}
            currentInput={currentInput}
            startTime={startTime}
            endTime={endTime}
          />
        </Spacer>
        <ParticipantsPerTime participantsPerBlock={participantsPerBlock} />
      </S.ModalContent>
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <BottomFixedButton
          type="button"
          disabled={requestDisabled || !endTime}
          onClick={handleClickButton}
        >
          {!requestDisabled
            ? endTime
              ? `${startTime}-${endTime} ${buttonText}`
              : "종료 시간을 선택해주세요"
            : "이미 예약한 시간이 포함되어 있습니다"}
        </BottomFixedButton>
      </div>

      <HasBallDecisionModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDecideBall={handleDecideHasBall}
      />
    </>
  );
};

export default SelectedRangeContent;
