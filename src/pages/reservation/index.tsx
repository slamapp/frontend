import { ModalSheet } from "@components/base";
import { TimeTable } from "@components/domain";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const convertFalsyOrTruthyValue = (falsyOrTruthyString: string) => {
  if (falsyOrTruthyString === "false") {
    return false;
  } else {
    return true;
  }
};

const data = {
  courtId: 7,
  date: "2021-12-31",
  reservations: [
    {
      reservationId: 10,
      userId: 2,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: "false",
    },
    {
      reservationId: 13,
      userId: 3,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: "true",
    },
    {
      reservationId: 17,
      userId: 4,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: "false",
    },
    {
      reservationId: 21,
      userId: 5,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: "false",
    },
    {
      reservationId: 24,
      userId: 6,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T14:00:00",
      hasBall: "false",
    },
    {
      reservationId: 27,
      userId: 8,
      courtId: 7,
      startTime: "2021-01-01T12:00:00",
      endTime: "2021-01-01T15:00:00",
      hasBall: "false",
    },
  ],
};

const TIME_TABLE_ROWS = 24 * 2;
const HALF_TIME = 30;

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

      acc[i].ballCount = convertFalsyOrTruthyValue(reservation.hasBall)
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

const Reservation: NextPage = () => {
  const [timeTableArr, setTimeTableArr] = useState<number[]>(() =>
    getTimeTableInfoFromReservations(data.reservations)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBlockUsers, setSelectedBlockUsers] = useState<any>(null);

  const onClickTimeBlock = useCallback((users: any) => {
    setIsOpen(true);
    setSelectedBlockUsers(users);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <TimeTable
        timeTableArr={timeTableArr}
        onClickTimeBlock={onClickTimeBlock}
      />
      <ModalSheet isOpen={isOpen} onClose={onClose}>
        {selectedBlockUsers &&
          selectedBlockUsers.map(({ userId, avatarImgSrc }: any) => (
            <div key={userId}>{userId}</div>
          ))}
      </ModalSheet>
    </div>
  );
};

export default Reservation;
