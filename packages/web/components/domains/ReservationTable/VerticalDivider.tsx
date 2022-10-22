import { css } from "@emotion/react"
import { useReservationTableContext } from "./context"

const VerticalDivider = () => {
  const { tableCellHeight } = useReservationTableContext()

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        bottom: 0;
        right: ${tableCellHeight}px;
        width: 4px;
        background-color: black;
      `}
    />
  )
}

export default VerticalDivider
