import React from "react";
import CommonModalContent from "./StepTwoCommonContent";

interface Props {
  timeSlot: string;
  participantsPerBlock: any[];
  reservationId: number;
  onDeleteReservation: (reservationId: number) => void;
  onStartUpdate: () => void;
}

const ExistedReservationContent = ({
  timeSlot,
  participantsPerBlock,
  reservationId,
  onDeleteReservation,
  onStartUpdate,
}: Props) => {
  return (
    <>
      <CommonModalContent
        timeSlot={timeSlot}
        participantsPerBlock={participantsPerBlock}
      />
      <button type="button" onClick={() => onDeleteReservation(reservationId)}>
        예약 취소
      </button>
      <button type="button" onClick={onStartUpdate}>
        예약 수정
      </button>
    </>
  );
};

export default ExistedReservationContent;
