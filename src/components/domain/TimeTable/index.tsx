import { useEffect, useState } from "react";

import { useResize } from "@hooks/.";
import * as S from "./style";
import type {
  ActionTimeBlockUnitProps,
  TimeBlockUnitProps,
  HourProps,
  Status,
} from "./type";

const MAJOR_UNIT = 12;
const ACTIVE_RESERVATION_COUNT = 6;

const TimeTable = ({
  timeTable,
  onClickStatusBlock,
  startIndex,
  endIndex,
  step,
}: any) => {
  const [height, setHeight] = useState(0);

  const ref = useResize<HTMLDivElement>((rect) => {
    setHeight(rect.width);
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetWidth);
    }
  }, [ref]);

  return (
    <S.TimeTableContainer>
      <ActionTimeBlockUnit rowRef={ref} height={height} previous />
      {timeTable.map((item: any, index: number) => (
        <TimeBlockUnit
          height={height}
          key={index}
          index={index}
          reservationCount={item.peopleCount}
          ballCount={item.ballCount}
          // selected={selectedIndex === index}
          onClickStatusBlock={onClickStatusBlock}
          selected={startIndex === index}
          step={step}
        />
      ))}
      {step === 2 && (
        <RangeSelector
          unit={height}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
      <ActionTimeBlockUnit height={height} next />
    </S.TimeTableContainer>
  );
};

export default TimeTable;

const Hour: React.FC<HourProps> = ({ hour }) => (
  <div>
    {hour}
    <span>시</span>
  </div>
);

const getTimeSlotFromIndex = (index: number) => {
  const startHours = Math.floor(index / 2);
  return index % 2 === 0
    ? `${startHours}:00 - ${startHours + 1}:30`
    : `${startHours}:30 - ${startHours + 1}:00`;
};

const TimeBlockUnit: React.FC<TimeBlockUnitProps> = ({
  index,
  height,
  reservationCount,
  ballCount,
  selected,
  onClickStatusBlock,
  step,
}) => {
  const isEven = index % 2 === 0;
  const hasBlackTopBorder = index % MAJOR_UNIT === 0;
  const hasBlackBottomBorder = index % MAJOR_UNIT === MAJOR_UNIT - 1;
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
          <S.Selector>
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

const ActionTimeBlockUnit: React.FC<ActionTimeBlockUnitProps> = ({
  height,
  rowRef,
  previous,
  next,
}) => (
  <S.TimeBlockUnitWrapper
    height={height}
    isEven={next}
    previous={previous}
    next={next}
  >
    {next ? (
      <S.HourColumn className="time-block__hour">
        <Hour hour={24} />
      </S.HourColumn>
    ) : (
      <S.OneSixthColumn ref={rowRef} />
    )}
    <S.FourSixthColumn className="time-block__action">
      <div>{previous ? "이전으로 가기" : "다음으로 가기"}</div>
    </S.FourSixthColumn>
    <S.VerticalDivider />
    <S.OneSixthColumn className="time-block__action" />
  </S.TimeBlockUnitWrapper>
);

const RangeSelector = ({ unit, startIndex, endIndex }: any) => {
  return (
    <>
      <S.StartRangeSelector
        style={{
          width: unit * 4,
          position: "absolute",
          left: unit,
          top: unit * (startIndex + 1) - 23,
        }}
      />

      {endIndex && (
        <>
          <div
            style={{
              position: "absolute",
              left: unit,
              top: unit * (startIndex + 1) - 3,
              height: unit * (endIndex + 2) - unit * (startIndex + 1) + 6,
              width: 8,
              backgroundColor: "black",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: unit * 5 - 8,
              top: unit * (startIndex + 1) - 3,
              height: unit * (endIndex + 2) - unit * (startIndex + 1) + 6,
              width: 8,
              backgroundColor: "black",
            }}
          ></div>
          <S.EndRangeSelector
            style={{
              width: unit * 4,
              position: "absolute",
              left: unit,
              top: unit * (endIndex + 2),
            }}
          />
        </>
      )}
    </>
  );
};
