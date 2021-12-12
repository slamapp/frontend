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

const TimeTable = ({ timeTable, onClickStatusBlock, selectedIndex }: any) => {
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
    <>
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
          selected={selectedIndex === index}
        />
      ))}
      <ActionTimeBlockUnit height={height} next />
    </>
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
        {selected ? (
          <S.Selector>
            <span>{getTimeSlotFromIndex(index)}</span>
          </S.Selector>
        ) : null}
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
