import React, { useMemo } from "react"
import styled from "@emotion/styled"
// import Flicking from "@egjs/react-flicking"
import type { Dayjs } from "dayjs"
import DateItem from "./DateItem"

const DAY_RANGE = 14

interface Props {
  onClick: (date: Dayjs) => void
  selectedDate: Dayjs
  startDate: Dayjs
}

const DatePicker: React.FC<Props> = ({ startDate, onClick, selectedDate }) => {
  const twoWeekDates = useMemo(
    () =>
      Array.from({ length: DAY_RANGE }, (_, index) =>
        startDate.add(index, "day")
      ),
    [startDate]
  )

  return (
    <>
      {/* <Flicking moveType="freeScroll" bound={true} horizontal={true}>
        {twoWeekDates.map((date, i) => (
          <DateItem
            key={i}
            date={date}
            onClick={onClick}
            selected={date.isSame(selectedDate)}
          />
        ))}
      </Flicking> */}
    </>
  )
}

export default DatePicker

// const StyledFlicking = styled(Flicking)`
//   transition: background-color 200ms;
//   padding-right: 16px;

//   .flicking-camera {
//     display: flex;
//     padding: 0 ${({ theme }) => theme.previousTheme.gaps.sm};
//     filter: ${({ theme }) => theme.previousTheme.filter.dropShadow};
//   }
// `
