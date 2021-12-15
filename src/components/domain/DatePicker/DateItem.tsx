import { Text } from "@components/base";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useMemo } from "react";

const weekday = ["일", "월", "화", "수", "목", "금", "토"] as const;

type WeekdayUnion = typeof weekday[number];

interface Props {
  date: Date;
  selected: boolean;
  onClick: (date: Date) => void;
}

const Day = styled.div<{ selected: boolean }>`
  ${({ selected }) =>
    selected &&
    css`
      background-color: gray;
      color: white;
    `}
`;

const DateItem = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    ({ date, onClick, selected }, ref) => {
      const dayOfWeek: WeekdayUnion = useMemo(
        () => weekday[date.getDay()],
        [date]
      );

      return (
        <div
          ref={ref}
          style={{ padding: 20, textAlign: "center" }}
          onClick={() => onClick(date)}
        >
          <Text>{dayOfWeek}</Text>
          <Day selected={selected}>{date.getDate()}</Day>
        </div>
      );
    }
  )
);

export default DateItem;
