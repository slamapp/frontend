import { useEffect, useState } from "react";
import { useResize } from "@hooks/.";
import * as S from "./style";
import ActionTimeBlockUnit from "./ActionTimeBlockUnit";
import TimeBlockUnit from "./TimeBlockUnit";
import RangeSelector from "./RangeSelector";

const TimeTable = ({
  timeTable,
  onClickStatusBlock,
  onClickReservationMarker,
  startIndex,
  endIndex,
  step,
  existedReservations,
  selectedReservationId,
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
          hasReservation={item.hasReservation}
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
      {existedReservations.map(
        ({ reservationId, startIndex, endIndex }: any) => (
          <>
            {step === 2 && selectedReservationId === reservationId ? null : (
              <S.ReservationMarker
                key={reservationId}
                width={height}
                height={height * (endIndex - startIndex + 1)}
                top={height * (startIndex + 1)}
                left={height}
                selected={reservationId === selectedReservationId}
                onClick={() => onClickReservationMarker(reservationId)}
              >
                <span>나의 예약</span>
              </S.ReservationMarker>
            )}
          </>
        )
      )}
      <ActionTimeBlockUnit height={height} next />
    </S.TimeTableContainer>
  );
};

export default TimeTable;
