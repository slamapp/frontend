import Flicking from "@egjs/react-flicking";
import styled from "@emotion/styled";
import React, { useMemo } from "react";
import DateItem from "./DateItem";

const DAY_RANGE = 14;

const StyledFlicking = styled(Flicking)`
  .flicking-camera {
    display: flex;
  }
`;

interface Props {
  onClick: (date: Date) => void;
  selectedDate: Date;
  startDate: Date;
}

const DatePicker: React.FC<Props> = ({ startDate, onClick, selectedDate }) => {
  const twoWeekDates = useMemo(
    () => [
      ...Array.from({ length: DAY_RANGE }, (_, index) => {
        const copiedDate = new Date(startDate.getTime());

        copiedDate.setDate(startDate.getDate() + index);

        return copiedDate;
      }),
    ],
    [startDate]
  );

  return (
    <StyledFlicking moveType="freeScroll" bound={true}>
      {twoWeekDates.map((date, i) => (
        <DateItem
          key={i}
          date={date}
          onClick={onClick}
          selected={date.getTime() === selectedDate.getTime()}
        />
      ))}
    </StyledFlicking>
  );
};
export default DatePicker;
