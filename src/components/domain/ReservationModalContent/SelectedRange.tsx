import { Button } from "@components/base";
import React, { MouseEvent, useCallback, useState } from "react";
import Modal from "../Modal";
import BottomFixedButton from "../BottomFixedButton";
import CommonModalContent from "./StepTwoCommonContent";
import HasBallDecisionModal from "./HasBallDecisionModal";

interface Props {
  timeSlot: string;
  hasBall: boolean;
  buttonText: string;
  requestDisabled: boolean;
  participantsPerBlock: any[];
  onChangeHasBall: (hasBall: boolean) => void;
  onSubmit: () => void;
}

const SelectedRangeContent = ({
  timeSlot,
  buttonText,
  participantsPerBlock,
  requestDisabled,
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
      onSubmit();
    },
    [onChangeHasBall, onSubmit]
  );

  return (
    <>
      <CommonModalContent
        timeSlot={timeSlot}
        participantsPerBlock={participantsPerBlock}
      />
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <BottomFixedButton
          type="button"
          disabled={requestDisabled}
          onClick={handleClickButton}
        >
          {!requestDisabled
            ? `${timeSlot}${buttonText}`
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
