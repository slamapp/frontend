import { ModalSheet } from "@components/base";
import {
  TimeTable,
  ReservationModalContent as ModalContent,
} from "@components/domain";
import { getTimeFromIndex } from "@components/domain/TimeTable/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const TIME_TABLE_ROWS = 24 * 2;
const MAX_RESERVATION_TIME_BLOCK_UNIT = 6;
const MINUTES_PER_TIME_BLOCK = 30;

const data = {
  reservations: [
    {
      reservationId: 10,
      userId: 2,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: true,
    },
    {
      reservationId: 13,
      userId: 3,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 17,
      userId: 4,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 21,
      userId: 5,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: false,
    },
    {
      reservationId: 24,
      userId: 6,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: false,
    },
    {
      reservationId: 27,
      userId: 8,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 28,
      userId: 9,
      courtId: 7,
      startTime: "2021-01-01T14:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 29,
      userId: "me",
      courtId: 7,
      startTime: "2021-01-01T14:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 290,
      userId: "me",
      courtId: 7,
      startTime: "2021-01-01T19:00:00",
      endTime: "2021-01-01T21:00:00",
      hasBall: true,
    },
  ],
};

const getIndexFromDate = (dateString: string) => {
  const date = new Date(dateString);

  const hour = date.getHours();
  const minute = date.getMinutes();

  return hour * 2 + (minute === MINUTES_PER_TIME_BLOCK ? 1 : 0);
};

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
      const startRow = getIndexFromDate(reservation.startTime);
      // TODO: 왜 -1 해야 되더라
      const endRow = getIndexFromDate(reservation.endTime) - 1;
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
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case "SET_TIMETABLE": {
      const { reservations } = payload;

      const { timeTable, existedReservations } =
        getTimeTableInfoFromReservations(reservations, "me");

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
    case "SET_START_INDEX": {
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
      let { endIndex } = payload;
      const {
        mode,
        originalTimeTable,
        startIndex,
        hasBall,
        existedReservations,
        selectedReservationId,
      } = state;

      if (endIndex < startIndex) return state;

      if (endIndex - startIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
        console.log("3시간을 초과하여 예약할 수 없습니다.");
        endIndex = startIndex + MAX_RESERVATION_TIME_BLOCK_UNIT - 1;
      }

      if (mode === "create") {
        const timeTable = [...originalTimeTable];

        const modalContentData = [];
        let requestDisabled = false;

        for (let i = startIndex; i <= endIndex; i += 1) {
          const { users, peopleCount, ballCount, hasReservation } =
            timeTable[i];

          timeTable[i] = {
            ...timeTable[i],
            users: hasReservation ? users : [...users, { userId: "me" }],
            peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            ballCount: hasBall ? ballCount + 1 : ballCount,
          };

          modalContentData.push({ index: i, users: timeTable[i].users });

          if (timeTable[i].hasReservation) {
            requestDisabled = true;
          }
        }

        return {
          ...state,
          endIndex,
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

        if (selectedReservation.endIndex - endIndex > 0) {
          for (let i = selectedReservation.endIndex; i > endIndex; i -= 1) {
            const { users, peopleCount, ballCount } = timeTable[i];
            timeTable[i] = {
              ...timeTable[i],
              users: users.filter(
                ({ userId }: any) => userId !== selectedReservation.userId
              ),
              peopleCount: peopleCount - 1,
              ballCount: hasBall ? ballCount - 1 : ballCount,
            };
          }
        }

        for (let i = startIndex; i <= endIndex; i += 1) {
          const { users, peopleCount, ballCount, hasReservation } =
            timeTable[i];

          if (
            !(
              i >= selectedReservation.startIndex &&
              i <= selectedReservation.endIndex
            )
          ) {
            timeTable[i] = {
              ...timeTable[i],
              users: [...users, { userId: "me" }],
              peopleCount: peopleCount + 1,
              ballCount: hasBall ? ballCount + 1 : ballCount,
            };
          }

          modalContentData.push({ index: i, users: timeTable[i].users });

          if (
            i < selectedReservation.startIndex &&
            i > selectedReservation.endIndex &&
            hasReservation
          ) {
            requestDisabled = true;
          }
        }

        return {
          ...state,
          endIndex,
          requestDisabled,
          timeTable,
          modalContentData,
        };
      }
    }
    case "SET_HAS_BALL": {
      const {
        mode,
        startIndex,
        endIndex,
        originalTimeTable,
        timeTable,
        selectedReservationId,
        existedReservations,
      } = state;
      const { hasBall } = payload;

      const nextTimeTable = [...timeTable];

      if (mode === "create") {
        for (let i = startIndex; i <= endIndex; i += 1) {
          nextTimeTable[i] = {
            ...timeTable[i],
            ballCount: hasBall
              ? originalTimeTable[i].ballCount + 1
              : originalTimeTable[i].ballCount,
          };
        }
      } else {
        const selectedReservation = existedReservations.find(
          ({ reservationId }: any) => reservationId === selectedReservationId
        );
        for (let i = startIndex; i <= endIndex; i += 1) {
          //  예약 범위
          if (
            i >= selectedReservation.startIndex &&
            i <= selectedReservation.endIndex
          ) {
            nextTimeTable[i] = {
              ...timeTable[i],
              ballCount:
                hasBall === selectedReservation.hasBall
                  ? originalTimeTable[i].ballCount
                  : hasBall
                  ? originalTimeTable[i].ballCount + 1
                  : originalTimeTable[i].ballCount - 1,
            };
          } else {
            nextTimeTable[i] = {
              ...timeTable[i],
              ballCount: hasBall
                ? originalTimeTable[i].ballCount + 1
                : originalTimeTable[i].ballCount,
            };
          }
        }
      }
      return {
        ...state,
        timeTable: nextTimeTable,
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

    default:
      return state;
  }
};

const Reservation: NextPage = () => {
  const {
    query: { courtId, date },
  } = useRouter();
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
  } = reservation;

  const reservationDateText = useMemo(() => {
    const day = new Date(date as string);
    return `${day.getFullYear()}년 ${day.getMonth()}월 ${day.getDate()}일`;
  }, [date]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSetStartIndex = (startIndex: number) => {
    setIsOpen(true);
    dispatch({ type: "SET_START_INDEX", payload: { startIndex } });
  };

  const handleSetEndIndex = (endIndex: number) => {
    setIsOpen(true);
    dispatch({ type: "SET_END_INDEX", payload: { endIndex } });
  };

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleStartCreate = useCallback(() => {
    setIsOpen(false);
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

  const handleCreateReservation = useCallback(() => {
    if (!date || !courtId) {
      return;
    }

    const data = {
      courtId,
      userId: "me",
      startDate: new Date(
        `${date} ${getTimeFromIndex(startIndex)}`
      ).toISOString(),
      endDate: new Date(`${date} ${getTimeFromIndex(endIndex)}`).toISOString(),
      hasBall,
    };

    console.log("create", data);
    // TODO: crateReservation API CALL
    // alert(JSON.stringify(data));
  }, [courtId, date, endIndex, hasBall, startIndex]);

  const handleUpdateReservation = useCallback(() => {
    if (!date || !courtId) {
      return;
    }

    const data = {
      courtId,
      userId: "me",
      startDate: new Date(
        `${date} ${getTimeFromIndex(startIndex)}`
      ).toISOString(),
      endDate: new Date(`${date} ${getTimeFromIndex(endIndex)}`).toISOString(),
      hasBall,
    };

    console.log("update", data);
    // TODO: crateReservation API CALL
    // alert(JSON.stringify(data));
  }, [courtId, date, endIndex, hasBall, startIndex]);

  const handleDeleteReservation = useCallback((reservationId: number) => {
    console.log(`delete /reservations/${reservationId}`);
  }, []);

  const handleChangeHasBall = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "SET_HAS_BALL",
        payload: { hasBall: e.target.checked },
      });
    },
    []
  );

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

  useEffect(() => {
    // TODO: getCourtReservations API CALL
    dispatch({
      type: "SET_TIMETABLE",
      payload: { reservations: data.reservations },
    });
  }, []);

  return (
    <div>
      {step > 1 && (
        <button type="button" onClick={handleDecreaseStep}>
          뒤로 가기
        </button>
      )}
      <TimeTable
        timeTable={timeTable || []}
        onClickStatusBlock={
          step === 1 ? handleSetStartIndex : handleSetEndIndex
        }
        onClickReservationMarker={
          step === 1 ? handleClickReservationMarker : () => {}
        }
        startIndex={startIndex}
        endIndex={endIndex}
        step={step}
        selectedReservationId={selectedReservationId}
        existedReservations={existedReservations}
      />
      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {isOpen && step === 1 && startIndex && modalContentData && (
          <ModalContent.BlockStatus
            startTime={getTimeFromIndex(startIndex)}
            endTime={getTimeFromIndex(startIndex + 1)}
            participants={modalContentData}
            onStartCreate={handleStartCreate}
            availableReservation={!timeTable[startIndex].hasReservation}
          />
        )}
        {isOpen && step === 1 && selectedReservationId && modalContentData && (
          <ModalContent.ExistedReservation
            timeSlot={`${getTimeFromIndex(startIndex)} -${getTimeFromIndex(
              endIndex
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
            timeSlot={`${getTimeFromIndex(startIndex)} - ${getTimeFromIndex(
              endIndex
            )}`}
            participantsPerBlock={modalContentData}
            hasBall={hasBall}
            requestDisabled={requestDisabled}
            onChangeHasBall={handleChangeHasBall}
            onCreateReservation={
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
    </div>
  );
};

export default Reservation;
