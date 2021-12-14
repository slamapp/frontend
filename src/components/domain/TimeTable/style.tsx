import { css } from "@emotion/react";
import styled from "@emotion/styled";

const TimeTableContainer = styled.div`
  position: relative;
`;

const ReservationMarker = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${({ top, left, width, height, selected }) => css`
    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${height}px;
    border: ${selected && "8px solid orange"};
  `};
  background-color: black;
  color: white;
  border-radius: 16px;
  box-sizing: border-box;
`;

export { TimeTableContainer, ReservationMarker };
