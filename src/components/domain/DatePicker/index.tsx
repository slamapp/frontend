import React, { useMemo } from "react";
import Flicking from "@egjs/react-flicking";
import styled from "@emotion/styled";

import DateItem from "./DateItem";

const DAY_RANGE = 14;

interface Props {
  onClick: (date: Date) => void;
  selectedDate: Date;
  startDate: Date;
  isBackgroundTransparent: boolean;
}

const DatePicker: React.FC<Props> = ({
  isBackgroundTransparent,
  startDate,
  onClick,
  selectedDate,
}) => {
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
    <StyledFlicking
      style={{
        backgroundColor: isBackgroundTransparent
          ? "rgba(255,255,255,0)"
          : "rgba(255,255,255,1)",
      }}
      moveType="freeScroll"
      bound={true}
      horizontal={true}
    >
      {twoWeekDates.map((date, i) => (
        <DateItem
          key={i}
          date={date}
          onClick={onClick}
          selected={date.getTime() === selectedDate.getTime()}
        />
      ))}
      <span style={{ width: 10 }}></span>
    </StyledFlicking>
  );
};

export default DatePicker;

const StyledFlicking = styled(Flicking)`
  transition: background-color 200ms;

  .flicking-camera {
    display: flex;
    padding: 0 ${({ theme }) => theme.gaps.sm};
    filter: ${({ theme }) => theme.filter.dropShadow};
  }
`;
