import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TimeBlockUnitWrapperProps, StatusProps } from "./type";

const TimeTableContainer = styled.div`
  position: relative;
`;

const OneSixthColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  height: 100%;
`;

const FourSixthColumn = styled.div`
  flex-grow: 4;
  flex-basis: 0;
  height: 100%;
`;

const HourColumn = styled(OneSixthColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 20px;
`;

const TimeBlockUnitWrapper = styled.div<TimeBlockUnitWrapperProps>`
  display: flex;
  height: ${({ height }) => `${height}px`};

  ${({ isEven, hasBlackTopBorder, hasBlackBottomBorder }) => {
    const black = "black";
    const transparentBlack = "rgb(0 0 0 / 0.2)";
    const topBorderColor = hasBlackTopBorder ? black : transparentBlack;
    const bottomBorderColor = hasBlackBottomBorder ? black : transparentBlack;

    return isEven
      ? css`
          & .time-block__hour {
            transform: translate(0, -50%);

            span {
              font-size: 12px;
            }
          }

          & .time-block__status,
          .time-block__ball {
            box-shadow: 0 4px 0 ${topBorderColor} inset,
              0 -2px 0 ${bottomBorderColor} inset;
          }
        `
      : css`
          & .time-block__status,
          .time-block__ball {
            box-shadow: 0 2px 0 ${topBorderColor} inset,
              0 -4px 0 ${bottomBorderColor} inset;
          }
        `;
  }}

  ${({ previous }) =>
    previous &&
    css`
      & .time-block__action {
        box-shadow: 0 -4px 0 black inset;
      }
    `}

    ${({ next }) =>
    next &&
    css`
      & .time-block__action {
        box-shadow: 0 4px 0 black inset;
      }
    `}
`;

const HoursHorizontalDivider = styled.div`
  position: absolute;
  height: 2px;
  width: 20%;
  top: -1px;
  background-color: black;
  opacity: 0.08;
`;

const StatusColumn = styled(FourSixthColumn)<StatusProps>`
  background-color: ${({ status }) => {
    switch (status) {
      case "active":
        return "orange";
      case "lack":
        return "gray";
      default:
        return "transparent";
    }
  }};
`;

const BallColumn = styled(OneSixthColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 8px;
  height: 100%;
  background-color: black;
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  background-color: black;
  border-radius: 16px;
  border: 8px solid orange;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
`;

const StartRangeSelector = styled.div<any>`
  border-radius: 16px 16px 4px 4px;
  background-color: black;
  height: 23px;
`;

const EndRangeSelector = styled.div<any>`
  position: relative;
  top: -23px;
  border-radius: 4px 4px 16px 16px;
  background-color: black;
  height: 23px;
`;

export {
  TimeTableContainer,
  OneSixthColumn,
  FourSixthColumn,
  TimeBlockUnitWrapper,
  HourColumn,
  HoursHorizontalDivider,
  StatusColumn,
  BallColumn,
  VerticalDivider,
  Selector,
  StartRangeSelector,
  EndRangeSelector,
};
