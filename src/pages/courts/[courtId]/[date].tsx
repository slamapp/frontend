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
      const endRow = getIndexFromDateString(reservation.endTime);
      const hasReservation = reservation.userId === userId;

      if (hasReservation) {
        existedReservations.push({
          reservationId: reservation.reservationId,
          startIndex: startRow,
          endIndex: endRow - 1,
          hasBall: reservation.hasBall,
        });
      }

      for (let i = startRow; i < endRow; i += 1) {
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

const getIsPastDay = (date: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(date).getTime() < today.getTime();
};

const ONE_HOUR = 60 * 60 * 1000;

const getIsPastTime = (datetime: string) => {
  const today = new Date();
  const date = new Date(datetime);
  date.setTime(date.getTime() - ONE_HOUR);

  return date < today;
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
        modalContentData: [],
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
        endIndex: null,
        selectedReservationId: null,
        selectedReservation: null,
        modalContentData: state.timeTable[startIndex].users,
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
        selectedReservation,
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

      const {
        mode,
        originalTimeTable,
        endIndex,
        existedReservations,
        selectedReservationId,
        startIndex,
        hasBall,
      } = state;

      const timeTable = [...originalTimeTable];
      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const modalContentData = [];
      let requestDisabled = false;

      if (state.currentInput === "START") {
        if (endIndex === null) {
          return {
            ...state,
            startIndex: timeIndex,
          };
        }

        if (endIndex - timeIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = endIndex - MAX_RESERVATION_TIME_BLOCK_UNIT + 1;
        }

        if (mode === "create") {
          if (timeIndex > endIndex) {
            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable: [...originalTimeTable],
            };
          }

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (hasReservation) {
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
          if (timeIndex > endIndex) {
            for (
              let i = selectedReservation.startIndex;
              i <= selectedReservation.endIndex;
              i += 1
            ) {
              const { peopleCount, users, ballCount } = timeTable[i];

              timeTable[i] = {
                ...timeTable[i],
                peopleCount: peopleCount - 1,
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                ballCount: hasBall ? ballCount - 1 : ballCount,
              };
            }

            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable,
            };
          }

          if (endIndex < selectedReservation.endIndex) {
            for (let i = selectedReservation.endIndex; i > endIndex; i -= 1) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          if (timeIndex > selectedReservation.startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < timeIndex;
              i += 1
            ) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation, ballCount } =
              timeTable[i];

            if (
              i < selectedReservation.startIndex ||
              i > selectedReservation.endIndex
            ) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
                ballCount: hasBall ? ballCount + 1 : ballCount,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              (i < selectedReservation.startIndex ||
                i > selectedReservation.endIndex) &&
              hasReservation
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
        if (timeIndex - startIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = startIndex + MAX_RESERVATION_TIME_BLOCK_UNIT - 1;
        }

        if (mode === "create") {
          if (timeIndex < startIndex) {
            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable: [...originalTimeTable],
            };
          }

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (hasReservation) {
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
          if (timeIndex < startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i <= selectedReservation.endIndex;
              i += 1
            ) {
              const { peopleCount, users, ballCount, hasReservation } =
                timeTable[i];

              timeTable[i] = {
                ...timeTable[i],
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }

            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable,
            };
          }

          if (selectedReservation.startIndex < startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < startIndex;
              i += 1
            ) {
              const { users, peopleCount, hasReservation, ballCount } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          if (selectedReservation.endIndex - timeIndex > 0) {
            for (let i = selectedReservation.endIndex; i > timeIndex; i -= 1) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation, ballCount } =
              timeTable[i];

            if (
              i < selectedReservation.startIndex ||
              i > selectedReservation.endIndex
            ) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
                ballCount: hasBall ? ballCount + 1 : ballCount,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              (i < selectedReservation.startIndex ||
                i > selectedReservation.endIndex) &&
              hasReservation
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
    query: { courtId, date, timeSlot },
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
    selectedReservation,
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

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleStartCreate = useCallback(() => {
    // setIsOpen(false);
    dispatch({ type: "START_CREATE" });
  }, []);

  const handleDecreaseStep = useCallback(() => {
    setIsOpen(false);
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
        endTime: getDatetimeString(date as string, endIndex + 1),
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
        endTime: getDatetimeString(date as string, endIndex + 1),
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
        payload: {
          timeIndex,
          user: {
            user: currentUser,
            avatarImgSrc: currentUser.profileImageUrl,
          },
        },
      });
    },
    [currentUser]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (router.isReady && getIsPastDay(date as string)) {
      alert("과거의 예약 정보는 확인할 수 없습니다.");
      router.replace("/courts");
    }

    const el = document.querySelector("#scrolled-container");

    if (router.isReady && !timeSlot) {
      el!.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [router]);

  useEffect(() => {
    setNavigationTitle(<ReservationTitle date={date as string} />);
  }, [date, setNavigationTitle]);

  useEffect(() => {
    if (step > 1) {
      setCustomButtonEvent("취소", handleDecreaseStep);
    } else {
      clearNavigationEvent();
    }

    return () => clearNavigationEvent();
  }, [step, clearNavigationEvent, setCustomButtonEvent, handleDecreaseStep]);

  useEffect(() => {
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

    if (router.isReady && currentUser.userId) {
      initReservations();
    }
  }, [courtId, date, currentUser.userId, router]);

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
        onClose={handleClose}
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
              timeSlot={`${getTimeFromIndex(
                selectedReservation.startIndex
              )} - ${getTimeFromIndex(selectedReservation.endIndex + 1)}
              `}
              reservationId={selectedReservationId}
              participantsPerBlock={modalContentData}
              onDeleteReservation={handleDeleteReservation}
              onStartUpdate={handleStartUpdate}
              requestDisabled={getIsPastTime(
                `${date} ${getTimeFromIndex(selectedReservation.startIndex)}`
              )}
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
