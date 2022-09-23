import { useMemo, useRef } from "react"
import { css } from "@emotion/react"
import type { Dayjs } from "dayjs"
import { motion } from "framer-motion"
import DateItem from "./DateItem"

const DAY_RANGE = 14

interface Props {
  onClick: (date: Dayjs) => void
  selectedDate: Dayjs
  startDate: Dayjs
}

const DatePicker = ({ startDate, onClick, selectedDate }: Props) => {
  const twoWeekDates = useMemo(
    () =>
      Array.from({ length: DAY_RANGE }, (_, index) =>
        startDate.add(index, "day")
      ),
    [startDate]
  )

  const gap = 16
  const dateItemWidth = 50

  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div ref={ref} whileTap={{ cursor: "grabbing" }}>
      <motion.div
        css={css`
          display: flex;
          gap: ${gap}px;
          padding: ${gap}px;
        `}
        drag="x"
        dragConstraints={{
          right: 0,
          left:
            -(gap + (dateItemWidth + gap) * 14) +
            (ref.current?.offsetWidth || 0),
        }}
      >
        {twoWeekDates.map((date) => {
          return (
            <DateItem
              width={dateItemWidth}
              key={date.toISOString()}
              date={date}
              onClick={onClick}
              selected={date.isSame(selectedDate)}
            />
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default DatePicker
