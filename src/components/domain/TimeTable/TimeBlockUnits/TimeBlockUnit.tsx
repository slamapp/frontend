import * as S from "./style";
import { MAJOR_TIME_BLOCK_UNIT, ACTIVE_RESERVATION_COUNT } from "../constants";
import { TimeBlockUnitProps, Status } from "../type";

import Hour from "./Hour";

const getTimeSlotFromIndex = (index: number) => {
  const startHours = Math.floor(index / 2);
  return index % 2 === 0
    ? `${startHours}:00 - ${startHours}:30`
    : `${startHours}:30 - ${startHours + 1}:00`;
};

const TimeBlockUnit: React.FC<TimeBlockUnitProps> = ({
  index,
  height,
  reservationCount,
  ballCount,
  selected,
  hasReservation,
  onClickStatusBlock,
  step,
}) => {
  const isEven = index % 2 === 0;
  const hasBlackTopBorder = index % MAJOR_TIME_BLOCK_UNIT === 0;
  const hasBlackBottomBorder =
    index % MAJOR_TIME_BLOCK_UNIT === MAJOR_TIME_BLOCK_UNIT - 1;
  const status: Status =
    reservationCount === 0
      ? "none"
      : reservationCount >= ACTIVE_RESERVATION_COUNT
      ? "active"
      : "lack";

  return (
    <S.TimeBlockUnitWrapper
      height={height}
      isEven={isEven}
      hasBlackTopBorder={hasBlackTopBorder}
      hasBlackBottomBorder={hasBlackBottomBorder}
    >
      <S.HourColumn className="time-block__hour">
        {isEven ? <Hour hour={index / 2} /> : <S.HoursHorizontalDivider />}
      </S.HourColumn>
      <S.StatusColumn
        className="time-block__status"
        status={status}
        onClick={() => {
          onClickStatusBlock(index);
        }}
      >
        {selected && step === 1 && (
          <S.Selector hasReservation={hasReservation}>
            <span>{getTimeSlotFromIndex(index)}</span>
          </S.Selector>
        )}
      </S.StatusColumn>
      <S.VerticalDivider />
      <S.BallColumn className="time-block__ball">
        <span>{status !== "none" && (ballCount !== 0 ? ballCount : "😭")}</span>
      </S.BallColumn>
    </S.TimeBlockUnitWrapper>
  );
};

export default TimeBlockUnit;
