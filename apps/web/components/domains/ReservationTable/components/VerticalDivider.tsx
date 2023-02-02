import { css } from "@emotion/react"
import { useReservationTable } from "../context"

const VerticalDivider = () => {
  const { tableCellHeight } = useReservationTable()

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        right: ${tableCellHeight}px;
        bottom: 0;
        width: 4px;
        background-color: black;
      `}
    />
  )
}

export default VerticalDivider
