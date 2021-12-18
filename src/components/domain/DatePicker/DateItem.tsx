import React, { useMemo } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Text } from "@components/base";
import { weekdays } from "@utils/timeTable";

interface Props {
  date: Date;
  selected: boolean;
  onClick: (date: Date) => void;
}

const DateItem = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    ({ date, onClick, selected }, ref) => {
      const dayOfWeekIndex = useMemo(() => date.getDay(), [date]);

      return (
        <DateItemContainer ref={ref} onClick={() => onClick(date)}>
          <DayOfTheWeek block index={dayOfWeekIndex}>
            {weekdays[dayOfWeekIndex]}
          </DayOfTheWeek>
          <Day selected={selected}>
            <span>{date.getDate()}</span>
          </Day>
        </DateItemContainer>
      );
    }
  )
);

export default DateItem;

const DateItemContainer = styled.div`
  margin-top: ${({ theme }) => theme.gaps.md};
  margin-bottom: ${({ theme }) => theme.gaps.xs};
  margin-right: 10px;
  display: "flex";
  flex-direction: column;
  text-align: center;
  cursor: pointer;
`;

const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;

const DayOfTheWeek = styled(Text)<{ index: number }>`
  margin-bottom: 10px;
  color: ${({ index, theme }) => {
    if (index === SUNDAY_INDEX) {
      return theme.colors.red.middle;
    } else if (index === SATURDAY_INDEX) {
      return theme.colors.blue.middle;
    } else {
      return theme.colors.gray700;
    }
  }};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const Day = styled(Text)<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.borderRadiuses.md};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.gray900 : "none"};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.gray900};

  transition: all 200ms;

  :hover {
    background: ${({ theme, selected }) =>
      selected ? theme.colors.gray900 : theme.colors.gray700};
    color: ${({ theme }) => theme.colors.white};
  }
`;
