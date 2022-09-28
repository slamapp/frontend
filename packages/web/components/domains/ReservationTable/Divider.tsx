import { css } from "@emotion/react"
import { useReservationTableContext } from "./context"

const Divider = () => {
  const { tableCellHeight } = useReservationTableContext()

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        bottom: 0;
        right: ${tableCellHeight}px;
        width: 6px;
        background-color: black;
      `}
    />
  )
}

export default Divider
