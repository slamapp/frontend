export const TIME_TABLE_ROWS = 24 * 2;
export const MINUTES_PER_TIME_BLOCK = 30;
export const MAX_RESERVATION_TIME_BLOCK_UNIT = 6;
export const MAJOR_TIME_BLOCK_UNIT = 12;
export const ACTIVE_RESERVATION_COUNT = 6;
export const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;

const TIME_OFFSET = 9;

export const getTimeFromIndex = (index: number) => {
  const startHours = Math.floor(index / 2)
    .toString()
    .padStart(2, "0");

  return index % 2 === 0 ? `${startHours}:00` : `${startHours}:30`;
};

export const getIndexFromDateString = (dateString: string | Date) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 2 + (minutes === MINUTES_PER_TIME_BLOCK ? 1 : 0);
};

export const getIndexFromDate = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 2 + (minutes >= MINUTES_PER_TIME_BLOCK ? 1 : 0);
};

export const getDateStringFromDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const getDatetimeString = (dateString: string, index: number) => {
  const date = new Date(`${dateString} ${getTimeFromIndex(index)}`);

  date.setHours(date.getHours() + TIME_OFFSET);

  if (index === TIME_TABLE_ROWS - 1) {
    date.setDate(date.getDate() + 1);
  }

  const datetimeString = date.toISOString();

  return datetimeString.slice(0, datetimeString.length - 1);
};
