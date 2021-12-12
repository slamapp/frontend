import { useState } from "react";

const TIME_TABLE_ROWS = 24 * 2;
const HALF_TIME = 30;
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

const useTimeTable = () => {
  const [timeTable, setTimeTable] = useState<any>(() =>
    getTimeTableInfoFromReservations(data.reservations)
  );

  return [timeTable, setTimeTable];
};

export default useTimeTable;
