import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState, Reducer } from "react";

import { ModalSheet, Text } from "@components/base";
import {
  TimeTable,
  ReservationModalContent as ModalContent,
  DayOfTheWeek,
} from "@components/domain";
import { useAuthContext, useNavigationContext } from "@contexts/hooks";

import {
  weekdays,
  TIME_TABLE_ROWS,
  MAX_RESERVATION_TIME_BLOCK_UNIT,
  getIndexFromDateString,
  getTimeFromIndex,
  getDatetimeString,
  getDateStringFromDate,
} from "@utils/timeTable";
import { courtApi, reservationApi } from "@service/.";

interface IReservation {
  reservationId: number | string;
  userId: number | string;
  courtId: number;
  startTime: string;
  endTime: string;
  hasBall: boolean;
}

const getTimeTableInfoFromReservations = (reservations: any, userId: any) => {
  const timeTable = Array.from({ length: TIME_TABLE_ROWS }, () => ({
    peopleCount: 0,
    ballCount: 0,
    users: [],
    hasReservation: false,
  }));

  return reservations.reduce(
    (acc: any, reservation: any) => {
      const { existedReservations, timeTable } = acc;
      const startRow = getIndexFromDateString(reservation.startTime);
      // TODO: 왜 -1 해야 되더라
      const endRow = getIndexFromDateString(reservation.endTime);
      const hasReservation = reservation.userId === userId;

      if (hasReservation) {
        existedReservations.push({
          reservationId: reservation.reservationId,
          startIndex: startRow,
          endIndex: endRow,
          hasBall: reservation.hasBall,
        });
      }

      for (let i = startRow; i <= endRow; i += 1) {
        timeTable[i].peopleCount += 1;

        timeTable[i].ballCount = reservation.hasBall
          ? timeTable[i].ballCount + 1
          : timeTable[i].ballCount;

        timeTable[i].users.push({
          userId: reservation.userId,
          avatarImgSrc: reservation.avatarImgSrc,
        });

        timeTable[i].hasReservation = hasReservation;
      }

      return acc;
    },
    { timeTable, existedReservations: [] }
  );
};

const initialState = {
  step: 1,
  mode: "create",
  startIndex: null,
  endIndex: null,
  timeTable: [],
  originalTimeTable: [],
  modalContentData: null,
  hasBall: false,
  existedReservations: [],
  selectedReservationId: null,
  requestDisabled: false,
  currentInput: "START",
};

const reducer: Reducer<any, any> = (state, { type, payload }) => {
  switch (type) {
    case "SET_TIMETABLE": {
      const { reservations, userId } = payload;

      const { timeTable, existedReservations } =
        getTimeTableInfoFromReservations(reservations, userId);

      return {
        ...state,
        timeTable,
        originalTimeTable: timeTable,
        existedReservations,
      };
    }
    case "START_CREATE": {
      return {
        ...state,
        mode: "create",
        step: state.step + 1,
        currentInput: "END",
      };
    }
    case "START_UPDATE": {
      const { existedReservations, selectedReservationId } = state;
      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const { startIndex, endIndex, hasBall } = selectedReservation;

      return {
        ...state,
        step: state.step + 1,
        mode: "update",
        startIndex,
        endIndex,
        hasBall,
        selectedReservation,
      };
    }
    case "DECREASE_STEP": {
      return {
        ...state,
        step: state.step - 1,
        endIndex: null,
        startIndex: null,
        selectedReservationId: null,
        timeTable: state.originalTimeTable,
        hasBall: false,
      };
    }
    case "CLICK_BLOCK": {
      const { startIndex } = payload;

      return {
        ...state,
        startIndex,
        lastIndex: null,
        selectedReservationId: null,
        modalContentData: state.timeTable[startIndex].users,
      };
    }
    case "SET_END_INDEX": {
      const { endIndex } = payload;
      return {
        ...state,
      };
    }
    case "SET_HAS_BALL": {
      const { hasBall } = payload;
      return {
        ...state,
        hasBall,
      };
    }
    case "CLICK_RESERVATION_MARKER": {
      const { existedReservations, timeTable } = state;
      const { selectedReservationId } = payload;

      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const { startIndex, endIndex } = selectedReservation;
      const modalContentData = [];
      for (let i = startIndex; i <= endIndex; i += 1) {
        const { users } = timeTable[i];
        modalContentData.push({ index: i, users });
      }

      return {
        ...state,
        selectedReservationId,
        modalContentData,
        startIndex: null,
      };
    }
    case "SET_CURRENT_INPUT": {
      const { currentInput } = payload;

      return {
        ...state,
        currentInput,
      };
    }
    case "SET_TIME_INDEX": {
      const { user } = payload;
      let { timeIndex } = payload;

      if (state.currentInput === "START") {
        const {
          mode,
          originalTimeTable,
          endIndex,
          existedReservations,
          selectedReservationId,
        } = state;

        if (endIndex === null) {
          return {
            ...state,
            startIndex: timeIndex,
          };
        }

        if (timeIndex > endIndex) {
          return {
            ...state,
            startIndex: timeIndex,
            endIndex: null,
            currentInput: "END",
            timeTable: [...originalTimeTable],
          };
        }

        if (endIndex - timeIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = endIndex - MAX_RESERVATION_TIME_BLOCK_UNIT + 1;
        }

        if (mode === "create") {
          const timeTable = [...originalTimeTable];

          const modalContentData = [];
          let requestDisabled = false;

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (timeTable[i].hasReservation) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            startIndex: timeIndex,
            timeTable,
            modalContentData,
            requestDisabled,
          };
        } else {
          // * update
          const timeTable = [...originalTimeTable];

          const modalContentData = [];
          let requestDisabled = false;

          const selectedReservation = existedReservations.find(
            ({ reservationId }: any) => reservationId === selectedReservationId
          );

          if (endIndex < selectedReservation.endIndex) {
            for (let i = selectedReservation.endIndex; i > endIndex; i -= 1) {
              const { users, peopleCount, hasReservation } = timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
              };
            }
          }

          if (timeIndex > selectedReservation.startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < timeIndex;
              i += 1
            ) {
              const { users, peopleCount, hasReservation } = timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
              };
            }
          }

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            if (!hasReservation) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              i < selectedReservation.startIndex ||
              (i > selectedReservation.endIndex && hasReservation)
            ) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            startIndex: timeIndex,
            requestDisabled,
            timeTable,
            modalContentData,
          };
        }
      } else {
        // * endIndex
        const {
          mode,
          originalTimeTable,
          startIndex,
          existedReservations,
          selectedReservationId,
        } = state;

        if (timeIndex < startIndex) {
          return {
            ...state,
            startIndex: timeIndex,
            endIndex: null,
            currentInput: "END",
            timeTable: [...originalTimeTable],
          };
        }

        if (timeIndex - startIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = startIndex + MAX_RESERVATION_TIME_BLOCK_UNIT - 1;
        }

        if (mode === "create") {
          const timeTable = [...originalTimeTable];

          const modalContentData = [];
          let requestDisabled = false;

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (timeTable[i].hasReservation) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            endIndex: timeIndex,
            timeTable,
            modalContentData,
            requestDisabled,
          };
        } else {
          const timeTable = [...originalTimeTable];

          const modalContentData = [];
          let requestDisabled = false;

          const selectedReservation = existedReservations.find(
            ({ reservationId }: any) => reservationId === selectedReservationId
          );

          if (selectedReservation.startIndex < startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < startIndex;
              i += 1
            ) {
              const { users, peopleCount, hasReservation } = timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
              };
            }
          }

          if (selectedReservation.endIndex - timeIndex > 0) {
            for (let i = selectedReservation.endIndex; i > timeIndex; i -= 1) {
              const { users, peopleCount, hasReservation } = timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
              };
            }
          }

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            if (!hasReservation) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              i < selectedReservation.startIndex ||
              (i > selectedReservation.endIndex && hasReservation)
            ) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            endIndex: timeIndex,
            requestDisabled,
            timeTable,
            modalContentData,
          };
        }
      }
    }

    default:
      return state;
  }
};

const Reservation: NextPage = () => {
  const router = useRouter();
  const {
    query: { courtId, date },
  } = router;

  const {
    authProps: { currentUser },
  } = useAuthContext();

  const {
    useMountPage,
    clearNavigationEvent,
    setCustomButtonEvent,
    setNavigationTitle,
  } = useNavigationContext();

  useMountPage((page) => page.COURT_RESERVATIONS);

  const [reservation, dispatch] = useReducer(reducer, initialState);
  const {
    startIndex,
    endIndex,
    mode,
    step,
    timeTable,
    existedReservations,
    requestDisabled,
    selectedReservationId,
    modalContentData,
    hasBall,
    currentInput,
  } = reservation;

  const [snap, setSnap] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSetCurrentBlock = (startIndex: number) => {
    setIsOpen(true);
    dispatch({ type: "CLICK_BLOCK", payload: { startIndex } });
  };

  const handleSetEndIndex = (endIndex: number) => {
    setIsOpen(true);
    dispatch({ type: "SET_END_INDEX", payload: { endIndex } });
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleStartCreate = useCallback(() => {
    // setIsOpen(false);
    dispatch({ type: "START_CREATE" });
  }, []);

  const handleDecreaseStep = useCallback(() => {
    // setIsOpen(false);
    dispatch({ type: "DECREASE_STEP" });
  }, []);

  const handleStartUpdate = useCallback(() => {
    setIsOpen(false);
    dispatch({ type: "START_UPDATE" });
  }, []);

  const handleCreateReservation = useCallback(
    async (hasBall: boolean) => {
      if (!date || !courtId) {
        return;
      }

      const data = {
        courtId: Number(courtId),
        startTime: getDatetimeString(date as string, startIndex),
        endTime: getDatetimeString(date as string, endIndex),
        hasBall,
      };

      try {
        await reservationApi.createReservation(data);
      } catch (error) {
        console.error(error);
      }

      router.push("/reservations");
    },
    [courtId, date, endIndex, startIndex, router]
  );

  const handleUpdateReservation = useCallback(
    async (hasBall: boolean) => {
      if (!date || !courtId) {
        return;
      }

      const data = {
        courtId: Number(courtId),
        startTime: getDatetimeString(date as string, startIndex),
        endTime: getDatetimeString(date as string, endIndex),
        hasBall,
      };

      try {
        await reservationApi.updateReservation(selectedReservationId, data);
      } catch (error) {
        console.error(error);
      }

      router.push("/reservations");
    },
    [courtId, date, endIndex, startIndex, selectedReservationId, router]
  );

  const handleDeleteReservation = useCallback(async () => {
    try {
      await reservationApi.deleteReservation(selectedReservationId);
    } catch (error) {
      console.error(error);
    }

    router.push("/reservations");
  }, [selectedReservationId, router]);

  const handleChangeHasBall = useCallback((hasBall: boolean) => {
    dispatch({
      type: "SET_HAS_BALL",
      payload: { hasBall },
    });
  }, []);

  const handleClickReservationMarker = useCallback(
    (selectedReservationId: number) => {
      setIsOpen(true);
      dispatch({
        type: "CLICK_RESERVATION_MARKER",
        payload: { selectedReservationId },
      });
    },
    []
  );

  const handleSetCurrentInput = useCallback((currentInput: string) => {
    dispatch({
      type: "SET_CURRENT_INPUT",
      payload: { currentInput },
    });
  }, []);

  const handleSetTime = useCallback(
    (timeIndex: number) => {
      setIsOpen(true);
      dispatch({
        type: "SET_TIME_INDEX",
        payload: { timeIndex, user: currentUser },
      });
    },
    [currentUser]
  );

  useEffect(() => {
    // FIXME 과거 예약 정보 링크로 들어올 시 모달로 안내 후 사용자를 /courts로 이동하는 시간계산 실패
    // if (new Date(date as string).getTime() < new Date().getTime()) {
    //   // TODO: 과거 예약 정보 링크로 들어올 시 모달로 안내 후 사용자를 /courts로 이동
    //   // alert("과거의 예약 정보는 확인할 수 없습니다.");
    //   router.replace("/courts");
    // }
  });

  useEffect(() => {
    setNavigationTitle(<ReservationTitle date={date as string} />);
  }, [date, setNavigationTitle]);

  useEffect(() => {
    if (step > 1) {
      setCustomButtonEvent("취소", handleDecreaseStep);
    } else {
      clearNavigationEvent();
    }
  }, [step, clearNavigationEvent, setCustomButtonEvent, handleDecreaseStep]);

  useEffect(() => {
    // FIXME router.isReady
    const initReservations = async () => {
      const { reservations } = await courtApi.getAllCourtReservationsByDate(
        courtId as string,
        date as string
      );

      dispatch({
        type: "SET_TIMETABLE",
        payload: { reservations, userId: currentUser.userId },
      });
    };

    initReservations();
  }, [courtId, date, currentUser]);

  return (
    <div>
      <TimeTable
        isToday={date === getDateStringFromDate(new Date())}
        timeTable={timeTable || []}
        onClickStatusBlock={step === 1 ? handleSetCurrentBlock : handleSetTime}
        onClickReservationMarker={
          step === 1 ? handleClickReservationMarker : () => {}
        }
        startIndex={startIndex}
        endIndex={endIndex}
        step={step}
        selectedReservationId={selectedReservationId}
        existedReservations={existedReservations}
      />
      <ModalSheet
        isOpen={isOpen}
        onClose={onClose}
        onSnap={(snap: number) => {
          setSnap(snap);
        }}
        onCloseStart={() => setSnap(-1)}
      >
        {isOpen && step === 1 && startIndex !== null && modalContentData && (
          <ModalContent.BlockStatus
            snap={snap}
            startTime={getTimeFromIndex(startIndex)}
            endTime={getTimeFromIndex(startIndex + 1)}
            participants={modalContentData}
            onStartCreate={handleStartCreate}
            availableReservation={!timeTable[startIndex].hasReservation}
          />
        )}
        {isOpen &&
          step === 1 &&
          selectedReservationId !== null &&
          modalContentData && (
            <ModalContent.ExistedReservation
              timeSlot={`${getTimeFromIndex(startIndex)} - ${getTimeFromIndex(
                endIndex + 1
              )}
              `}
              reservationId={selectedReservationId}
              participantsPerBlock={modalContentData}
              onDeleteReservation={handleDeleteReservation}
              onStartUpdate={handleStartUpdate}
            />
          )}
        {isOpen && step === 2 && modalContentData && (
          <ModalContent.SelectedRange
            startTime={getTimeFromIndex(startIndex)}
            endTime={endIndex ? getTimeFromIndex(endIndex + 1) : null}
            currentInput={currentInput}
            participantsPerBlock={modalContentData}
            hasBall={hasBall}
            requestDisabled={requestDisabled}
            onSetCurrentInput={handleSetCurrentInput}
            onChangeHasBall={handleChangeHasBall}
            onSubmit={
              mode === "create"
                ? handleCreateReservation
                : handleUpdateReservation
            }
            buttonText={
              mode === "create" ? "에 예약하기" : "으로 예약 수정하기"
            }
          />
        )}
      </ModalSheet>

      <div style={{ height: 320 }}></div>
    </div>
  );
};

export default Reservation;

const ReservationTitle: React.FC<{ date: string }> = ({ date }) => {
  const day = new Date(date as string);

  return (
    <Text size="base">
      {`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`}(
      <DayOfTheWeek index={day.getDay()} size="base">
        {weekdays[day.getDay()]}
      </DayOfTheWeek>
      )
    </Text>
  );
};
