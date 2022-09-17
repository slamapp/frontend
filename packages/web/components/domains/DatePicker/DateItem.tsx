import React, { useMemo } from "react"
import styled from "@emotion/styled"
import type { Dayjs } from "dayjs"
import { Text } from "~/components/uis/atoms"
import { week } from "~/utils/date"

interface Props {
  date: Dayjs
  selected: boolean
  onClick: (date: Dayjs) => void
}

const DateItem = React.memo(
  React.forwardRef<HTMLDivElement, Props>(
    ({ date, onClick, selected }, ref) => {
      const dayOfWeekIndex = useMemo(() => date.day(), [date])

      return (
        <DateItemContainer ref={ref} onClick={() => onClick(date)}>
          <DayOfTheWeek block index={dayOfWeekIndex}>
            {week[dayOfWeekIndex]}
          </DayOfTheWeek>
          <Day selected={selected}>
            <span>{date.date()}</span>
          </Day>
        </DateItemContainer>
      )
    }
  )
)

export default DateItem

const DateItemContainer = styled.div`
  margin-top: ${({ theme }) => theme.previousTheme.gaps.md};
  margin-bottom: ${({ theme }) => theme.previousTheme.gaps.xs};
  margin-right: 10px;
  display: "flex";
  flex-direction: column;
  text-align: center;
  cursor: pointer;
`

const SUNDAY_INDEX = 0
const SATURDAY_INDEX = 6

const DayOfTheWeek = styled(Text)<{ index: number }>`
  margin-bottom: 10px;
  color: ${({ index, theme }) => {
    if (index === SUNDAY_INDEX) {
      return theme.previousTheme.colors.red.middle
    } else if (index === SATURDAY_INDEX) {
      return theme.previousTheme.colors.blue.middle
    } else {
      return theme.previousTheme.colors.gray700
    }
  }};
  font-size: ${({ theme }) => theme.previousTheme.fontSizes.xs};
`

const Day = styled(Text)<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: ${({ theme }) => theme.previousTheme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};
  background: ${({ theme, selected }) =>
    selected ? theme.previousTheme.colors.gray900 : "none"};
  color: ${({ theme, selected }) =>
    selected
      ? theme.previousTheme.colors.white
      : theme.previousTheme.colors.gray900};

  transition: all 200ms;

  :hover {
    background: ${({ theme, selected }) =>
      selected
        ? theme.previousTheme.colors.gray900
        : theme.previousTheme.colors.gray700};
    color: ${({ theme }) => theme.previousTheme.colors.white};
  }
`
