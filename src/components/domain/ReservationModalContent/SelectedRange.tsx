import React, { ChangeEvent } from "react";
import CommonModalContent from "./StepTwoCommonContent";

interface Props {
  timeSlot: string;
  hasBall: boolean;
  buttonText: string;
  requestDisabled: boolean;
  participantsPerBlock: any[];
  onChangeHasBall: (e: ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <>
      <CommonModalContent
        timeSlot={timeSlot}
        participantsPerBlock={participantsPerBlock}
      />
      {requestDisabled ? (
        <div>이미 예약한 시간이 포함되어 있습니다.</div>
      ) : null}
      <label>
        농구공 가지고 참여
        <input
          type="checkbox"
          defaultChecked={false}
          onChange={onChangeHasBall}
          checked={hasBall}
        />
      </label>
      <button
        type="button"
        disabled={requestDisabled}
        onClick={onCreateReservation}
      >
        {timeSlot}
        {buttonText}
      </button>
    </>
  );
};

export default SelectedRangeContent;
