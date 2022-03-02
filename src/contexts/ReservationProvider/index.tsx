import { useAuthContext } from "@contexts/hooks";
import reservationApi from "@service/reservationApi";
import { getISOString } from "@utils/date";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useCallback, useReducer } from "react";

import ReservationContext from "./context";
import { reducer, initialState } from "./reducer";

interface Props {
  children: ReactNode;
}

const ReservationProvider = ({ children }: Props) => {
  const [reservation, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const {
    authProps: { currentUser },
  } = useAuthContext();

  const { startIndex, endIndex, selectedReservationId } = reservation;

  const handleInitReservation = useCallback(
    (reservations, courtName, date) => {
      if (currentUser.userId) {
        dispatch({
          type: "SET_TIMETABLE",
          payload: {
            reservations,
            courtName,
            date,
            userId: currentUser.userId,
          },
        });
      }
    },
    [currentUser]
  );

  const handleSetCurrentBlock = useCallback((startIndex) => {
    dispatch({ type: "CLICK_BLOCK", payload: { startIndex } });
  }, []);

  const handleStartCreate = useCallback(() => {
    // setIsOpen(false);
    dispatch({ type: "START_CREATE" });
  }, []);

  const handleDecreaseStep = useCallback(() => {
    dispatch({ type: "DECREASE_STEP" });
  }, []);

  const handleStartUpdate = useCallback(() => {
    dispatch({ type: "START_UPDATE" });
  }, []);

  const handleCreateReservation = useCallback(
    async (date, courtId, hasBall) => {
      if (!date || !courtId || !startIndex || !endIndex) {
        return;
      }

      const data = {
        courtId: Number(courtId),
        startTime: getISOString(date as string, startIndex),
        endTime: getISOString(date as string, endIndex + 1),
        hasBall,
      };

      try {
        await reservationApi.createReservation(data);
      } catch (error) {
        console.error(error);
      }

      router.push("/reservations");
    },
    [endIndex, startIndex, router]
  );

  const handleUpdateReservation = useCallback(
    async (date, courtId, hasBall) => {
      if (!date || !courtId || !startIndex || !endIndex) {
        return;
      }

      const data = {
        courtId: Number(courtId),
        startTime: getISOString(date as string, startIndex),
        endTime: getISOString(date as string, endIndex + 1),
        hasBall,
      };

      try {
        await reservationApi.updateReservation(selectedReservationId, data);
      } catch (error) {
        console.error(error);
      }

      router.push("/reservations");
    },
    [endIndex, startIndex, selectedReservationId, router]
  );

  const handleDeleteReservation = useCallback(
    async (selectedReservationId) => {
      try {
        await reservationApi.deleteReservation(selectedReservationId);
      } catch (error) {
        console.error(error);
      }

      router.push("/reservations");
    },
    [router]
  );

  const handleChangeHasBall = useCallback((hasBall) => {
    dispatch({
      type: "SET_HAS_BALL",
      payload: { hasBall },
    });
  }, []);

  const handleSelectReservation = useCallback((selectedReservationId) => {
    dispatch({
      type: "CLICK_RESERVATION_MARKER",
      payload: { selectedReservationId },
    });
  }, []);

  const handleSetCurrentInput = useCallback((currentInput) => {
    dispatch({
      type: "SET_CURRENT_INPUT",
      payload: { currentInput },
    });
  }, []);

  const handleSetTime = useCallback(
    (timeIndex) => {
      dispatch({
        type: "SET_TIME_INDEX",
        payload: {
          timeIndex,
          user: currentUser,
        },
      });
    },
    [currentUser]
  );

  return (
    <ReservationContext.Provider
      value={{
        reservation,
        handleInitReservation,
        handleSetCurrentBlock,
        handleStartCreate,
        handleStartUpdate,
        handleDecreaseStep,
        handleCreateReservation,
        handleUpdateReservation,
        handleDeleteReservation,
        handleChangeHasBall,
        handleSelectReservation,
        handleSetCurrentInput,
        handleSetTime,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationProvider;
