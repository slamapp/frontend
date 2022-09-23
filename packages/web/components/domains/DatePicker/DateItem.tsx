import { css, useTheme } from "@emotion/react"
import type { Dayjs } from "dayjs"
import { Text } from "~/components/uis/atoms"
import { week } from "~/utils/date"

interface Props {
  width: number
  date: Dayjs
  selected: boolean
  onClick: (date: Dayjs) => void
}

const SUNDAY_INDEX = 0
const SATURDAY_INDEX = 6

const DateItem = ({ width, date, onClick, selected }: Props) => {
  const dayOfWeekIndex = date.day()

  const theme = useTheme()

  return (
    <div
      css={css`
        width: ${width}px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 8px;
      `}
      onClick={() => onClick(date)}
    >
      <div
        css={css`
          background-color: ${selected
            ? theme.colors.gray0900
            : theme.colors.white};
          width: ${width}px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 0 32px -16px ${theme.colors.gray0300};
        `}
      >
        <Text
          strong
          color={
            dayOfWeekIndex === SUNDAY_INDEX
              ? theme.colors.red0300
              : dayOfWeekIndex === SATURDAY_INDEX
              ? theme.colors.blue0300
              : selected
              ? "white"
              : theme.colors.gray0700
          }
          size="xs"
        >
          {week[dayOfWeekIndex]}
        </Text>
        <Text
          strong
          color={selected ? theme.colors.white : theme.colors.gray0900}
        >
          {date.date()}
        </Text>
      </div>
    </div>
  )
}

export default DateItem
