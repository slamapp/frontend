import styled from "@emotion/styled"
import { useReservationTableContext } from "./context"

const Divider = () => {
  const { tableCellHeight } = useReservationTableContext()

  return <S.Divider tableCellHeight={tableCellHeight} />
}

export default Divider

const S = {
  Divider: styled.div<{ tableCellHeight: number }>`
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${({ tableCellHeight }) => tableCellHeight}px;
    width: 6px;
    background-color: black;
  `,
}
