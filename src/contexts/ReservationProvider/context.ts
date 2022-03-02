import { createContext } from "react";

import type { CurrentInputType } from "./reducer";

interface ContextProps {
  reservation: any;
  handleInitReservation: (
    rservations: any,
    courtName: string,
    date: any
  ) => void;
  handleSetCurrentBlock: (startIndex: number) => void;
  handleStartCreate: () => void;
  handleStartUpdate: () => void;
  handleDecreaseStep: () => void;
  handleCreateReservation: (
    date: string,
    courtId: string,
    hasBall: boolean
  ) => Promise<void>;
  handleUpdateReservation: (
    date: string,
    courtId: string,
    hasBall: boolean
  ) => Promise<void>;
  handleDeleteReservation: (
    selectedReservationId: number | string
  ) => Promise<void>;
  handleChangeHasBall: (hasBall: boolean) => void;
  handleSelectReservation: (selectedReservationId: number) => void;
  handleSetCurrentInput: (currentInput: CurrentInputType) => void;
  handleSetTime: (timeIndex: number) => void;
}

const ReservationContext = createContext<ContextProps>({} as ContextProps);

export default ReservationContext;
