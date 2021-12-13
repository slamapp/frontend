import { ModalSheet } from "@components/base";
import { TimeTable } from "@components/domain";
import { NextPage } from "next";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

const TIME_TABLE_ROWS = 24 * 2;
const HALF_TIME = 30;
const MAX_UNITS = 6;

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
      reservationId: 27,
      userId: 9,
      courtId: 7,
      startTime: "2021-01-01T14:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
    {
      reservationId: 27,
      userId: 9,
      courtId: 7,
      startTime: "2021-01-01T14:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: false,
    },
  ],
};

const getRowFromDate = (dateString: string) => {
  const date = new Date(dateString);

  const hour = date.getHours();
  const minute = date.getMinutes();

  return hour * 2 + (minute === HALF_TIME ? 1 : 0);
};

// 48칸
const getTimeTableInfoFromReservations = (reservations: any) => {
  const tables = Array.from({ length: TIME_TABLE_ROWS }, () => ({
    peopleCount: 0,
    ballCount: 0,
    users: [],
  }));

  return reservations.reduce((acc: any, reservation: any) => {
    const startRow = getRowFromDate(reservation.startTime);
    const endRow = getRowFromDate(reservation.endTime);

    for (let i = startRow; i < endRow; i += 1) {
      acc[i].peopleCount += 1;

      acc[i].ballCount = reservation.hasBall
        ? acc[i].ballCount + 1
        : acc[i].ballCount;

      acc[i].users.push({
        userId: reservation.userId,
        avatarImgSrc: reservation.avatarImgSrc,
      });
    }

    return acc;
  }, tables);
};
const initialState = {
  step: 1,
  type: "create",
  startIndex: null,
  endIndex: null,
  timeTable: null,
  originalTimeTable: null,
  modalContentData: null,
  hasBall: false,
};

const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case "SET_TIMETABLE": {
      const { reservations } = payload;

      const timeTable = getTimeTableInfoFromReservations(reservations);

      return {
        ...state,
        timeTable,
        originalTimeTable: timeTable,
      };
    }
    case "INCREASE_STEP": {
      return {
        ...state,
        step: state.step + 1,
      };
    }
    case "DECREASE_STEP": {
      return {
        ...state,
        step: state.step - 1,
        endIndex: null,
        startIndex: null,
        timeTable: state.originalTimeTable,
        hasBall: false,
      };
    }
    case "SET_START_INDEX": {
      const { startIndex } = payload;

      return {
        ...state,
        startIndex,
        modalContentData: state.timeTable[startIndex].users,
      };
    }
    case "SET_END_INDEX": {
      let { endIndex } = payload;
      const { originalTimeTable, startIndex, hasBall } = state;

      if (endIndex < startIndex) return state;

      if (endIndex - startIndex >= MAX_UNITS) {
        console.log("3시간을 초과하여 예약할 수 없습니다.");
        endIndex = startIndex + MAX_UNITS - 1;
      }

      const timeTable = [...originalTimeTable];
      const modalContentData = [];

      for (let i = startIndex; i <= endIndex; i += 1) {
        const { users, peopleCount, ballCount } = timeTable[i];

        timeTable[i] = {
          ...timeTable[i],
          users: [...users, { userId: "me" }],
          peopleCount: peopleCount + 1,
          ballCount: hasBall ? ballCount + 1 : ballCount,
        };

        modalContentData.push({ index: i, users });
      }

      return {
        ...state,
        endIndex,
        timeTable,
        modalContentData,
      };
    }
    case "SET_HAS_BALL": {
      const { startIndex, endIndex, originalTimeTable, timeTable } = state;
      const { hasBall } = payload;

      const nextTimeTable = [...timeTable];

      for (let i = startIndex; i <= endIndex; i += 1) {
        nextTimeTable[i] = {
          ...timeTable[i],
          ballCount: hasBall
            ? originalTimeTable[i].ballCount + 1
            : originalTimeTable[i].ballCount,
        };
      }

      return {
        ...state,
        timeTable: nextTimeTable,
        hasBall,
      };
    }
    default:
      return state;
  }
};

const Reservation: NextPage = () => {
  const [reservation, dispatch] = useReducer(reducer, initialState);

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

  const handleIncreaseStep = useCallback(() => {
    setIsOpen(false);
    dispatch({ type: "INCREASE_STEP" });
  }, []);

  const handleDecreaseStep = useCallback(() => {
    setIsOpen(false);
    dispatch({ type: "DECREASE_STEP" });
  }, []);

  const handleSubmitReservations = useCallback(() => {
    // TODO: crateReservation API CALL
    console.log("create reservation API CALL");
  }, []);

  const handleClickHasBall = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_HAS_BALL", payload: { hasBall: e.target.checked } });
  }, []);

  useEffect(() => {
    // TODO: getCourtReservations API CALL
    dispatch({
      type: "SET_TIMETABLE",
      payload: { reservations: data.reservations },
    });
  }, []);

  return (
    <div>
      {reservation.step > 1 && (
        <button type="button" onClick={handleDecreaseStep}>
          뒤로 가기
        </button>
      )}
      <TimeTable
        timeTable={reservation.timeTable || []}
        onClickStatusBlock={
          reservation.step === 1 ? handleSetStartIndex : handleSetEndIndex
        }
        startIndex={reservation.startIndex}
        endIndex={reservation.endIndex}
        step={reservation.step}
      />
      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {isOpen && reservation.step === 1 && reservation.modalContentData && (
          <>
            {reservation.modalContentData.map(
              ({ userId, avatarImgSrc }: any, index: number) => (
                <div key={index}>{userId}</div>
              )
            )}
            <button type="button" onClick={handleIncreaseStep}>
              예약하기
            </button>
          </>
        )}

        {isOpen && reservation.step === 2 && reservation.modalContentData && (
          <>
            {reservation.modalContentData.map(({ index, users }: any) => (
              <div key={index}>
                {users.map(({ userId }: any, i: any) => (
                  <span key={i}>{userId}</span>
                ))}
              </div>
            ))}
            <label>
              농구공 가지고 참여
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={handleClickHasBall}
                checked={reservation.hasBall}
              />
            </label>
            <button type="button" onClick={handleSubmitReservations}>
              예약 완료
            </button>
          </>
        )}
      </ModalSheet>
    </div>
  );
};

export default Reservation;
