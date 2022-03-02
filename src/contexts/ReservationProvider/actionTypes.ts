import type { ActionWithoutPayload, ActionWithPayload } from "@contexts/type";
import type { APIReservation, APIUser, OmitAt } from "@domainTypes/tobe";
import type { CurrentInputType } from "./reducer";

export type Action =
  | ActionWithPayload<
      "SET_TIMETABLE",
      {
        reservations: (Omit<OmitAt<APIReservation>, "court"> &
          Pick<APIUser, "profileImage">)[];
        userId: APIUser["id"];
        courtName: string;
        date: string;
      }
    >
  | ActionWithoutPayload<"START_CREATE">
  | ActionWithoutPayload<"START_UPDATE">
  | ActionWithoutPayload<"DECREASE_STEP">
  | ActionWithPayload<"CLICK_BLOCK", { startIndex: any }>
  | ActionWithPayload<"SET_HAS_BALL", { hasBall: boolean }>
  | ActionWithPayload<
      "CLICK_RESERVATION_MARKER",
      { selectedReservationId: string | number }
    >
  | ActionWithPayload<"SET_CURRENT_INPUT", { currentInput: CurrentInputType }>
  | ActionWithPayload<"SET_TIME_INDEX", { timeIndex: any; user: any }>;
