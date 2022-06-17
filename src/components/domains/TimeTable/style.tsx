import { css } from "@emotion/react"
import styled from "@emotion/styled"

const TimeTableContainer = styled.div`
  position: relative;
`

const ReservationMarker = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${({ top, left, width, height, selected, theme }) => css`
    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${height}px;
    border: ${selected && `8px solid ${theme.colors.slam.orange.strong}`};
  `};
  background-color: ${({ theme }) => theme.colors.gray900};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  box-sizing: border-box;
  text-align: center;
  filter: ${({ theme }) => theme.filter.dropShadow};
`

export { TimeTableContainer, ReservationMarker }
