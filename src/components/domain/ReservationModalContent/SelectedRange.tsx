import { Button } from "@components/base";
import React, { MouseEvent, useCallback, useState } from "react";
import Modal from "../Modal";
import BottomFixedButton from "../BottomFixedButton";
import CommonModalContent from "./StepTwoCommonContent";

interface Props {
  timeSlot: string;
  hasBall: boolean;
  buttonText: string;
  requestDisabled: boolean;
  participantsPerBlock: any[];
  onChangeHasBall: (hasBall: boolean) => void;
  onCreateReservation: () => void;
}

const SelectedRangeContent = ({
  timeSlot,
  hasBall,
  buttonText,
  participantsPerBlock,
  requestDisabled,
  onChangeHasBall,
  onCreateReservation,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickButton = useCallback(() => {
    setIsModalOpen(true);
    onCreateReservation();
  }, [onCreateReservation]);

  const handleDecideHasBall = useCallback(
    (hasBall: boolean) => {
      setIsModalOpen(false);
      onChangeHasBall(hasBall);
    },
    [onChangeHasBall]
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
        {requestDisabled ? (
          <div>이미 예약한 시간이 포함되어 있습니다.</div>
        ) : null}
        <BottomFixedButton
          type="button"
          disabled={requestDisabled}
          onClick={handleClickButton}
        >
          {timeSlot}
          {buttonText}
        </BottomFixedButton>
      </div>

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>농구공을 가지고 예약에 참여하시나요? 🤔</Modal.Header>
        <Modal.BottomButtonContainer>
          <Button
            style={{ flex: 1 }}
            secondary
            size="lg"
            onClick={() => handleDecideHasBall(false)}
          >
            아니오
          </Button>
          <Button
            style={{ flex: 1 }}
            size="lg"
            onClick={() => handleDecideHasBall(true)}
          >
            네, 농구공을 가져갑니다
          </Button>
        </Modal.BottomButtonContainer>
      </Modal>
    </>
  );
};

export default SelectedRangeContent;
