import { css } from "@emotion/react"
import dayjs from "dayjs"
import { useReservationTable } from "../context"

type Props = {
  startTime: string
  endTime: string | null
}

const Cursor = ({ startTime, endTime }: Props) => {
  const { tableCellHeight, dates } = useReservationTable()

  const startDay = dayjs(startTime)
  const diff = dayjs(endTime).diff(startDay, "minute")
  const height = Number.isNaN(diff)
    ? tableCellHeight
    : tableCellHeight + (tableCellHeight * diff) / 30

  const topSensorHeight = tableCellHeight * 6
  const topMargin =
    (startDay.diff(dayjs(dates[0]), "minute") / 30) * tableCellHeight

  console.log(topMargin)

  return (
    <div
      css={css`
        width: ${tableCellHeight}px;
        height: ${height}px;
        background-color: red;
        position: absolute;

        top: ${topSensorHeight + topMargin}px;
        left: 0px;
      `}
    >
      {startTime}, {endTime}
    </div>
  )
}

export default Cursor
