import { useMemo, useRef, useState } from "react"
import { css, useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import DateItem from "./DateItem"

const DAY_RANGE = 14

interface Props {
  initialValue?: Dayjs
  onChange: (date: Dayjs) => void
}

const DatePicker = ({ initialValue, onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState(
    initialValue ||
      (() => {
        const timezone = "Asia/Seoul"

        return dayjs().tz(timezone).hour(0).minute(0).second(0).millisecond(0)
      })
  )

  const twoWeekDates = useMemo(
    () =>
      Array.from({ length: DAY_RANGE }, (_, index) =>
        selectedDate.add(index, "day")
      ),
    []
  )

  const gap = 16
  const dateItemWidth = 50

  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      whileTap={{ cursor: "grabbing" }}
      css={css`
        position: relative;
      `}
    >
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
              onClick={(date) => {
                setSelectedDate(date)
                onChange(date)
              }}
              selected={date.isSame(selectedDate)}
            />
          )
        })}
      </motion.div>
      <GradientCover position="left" />
      <GradientCover position="right" />
    </motion.div>
  )
}

export default DatePicker

const GradientCover = ({ position }: { position: "left" | "right" }) => {
  const theme = useTheme()

  return (
    <motion.div
      css={css`
        width: 16px;
        position: absolute;
        ${position}: 0;
        top: 0;
        bottom: 0;
        background: ${position === "left"
          ? `linear-gradient(0.25turn,${theme.previousTheme.colors.gray50},transparent)`
          : `linear-gradient(0.25turn,transparent,${theme.previousTheme.colors.gray50})`};
        pointer-events: none;
      `}
    />
  )
}
