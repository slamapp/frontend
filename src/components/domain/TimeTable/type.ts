import type { RefObject } from "react";

interface TimeBlockUnitWrapperProps {
  height: number;
  previous?: boolean;
  next?: boolean;
  isEven?: boolean;
  hasBlackTopBorder?: boolean;
  hasBlackBottomBorder?: boolean;
  disabled?: boolean;
}

interface TimeBlockUnitProps extends Pick<TimeBlockUnitWrapperProps, "height"> {
  index: number;
  reservationCount: number;
  ballCount: number;
  selected: boolean;
  step: number;
  hasReservation: boolean;
  onClickStatusBlock: (index: number) => void;
  disabled?: boolean;
}

interface ActionTimeBlockUnitProps
  extends Pick<TimeBlockUnitWrapperProps, "height" | "previous" | "next"> {
  rowRef?: RefObject<HTMLDivElement>;
  disabled?: boolean;
}

interface HourProps {
  hour: number;
}

type Status = "active" | "lack" | "none";
interface StatusProps {
  status: Status;
}

export type {
  TimeBlockUnitWrapperProps,
  TimeBlockUnitProps,
  ActionTimeBlockUnitProps,
  HourProps,
  StatusProps,
  Status,
};
