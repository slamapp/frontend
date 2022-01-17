import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;
export const TIME_TABLE_ROWS = 24 * 2;
export const MINUTES_PER_TIME_BLOCK = 30;
export const MAX_RESERVATION_TIME_BLOCK_UNIT = 6;
export const MAJOR_TIME_BLOCK_UNIT = 12;
export const ACTIVE_RESERVATION_COUNT = 6;

const ONE_HOUR = 60 * 60 * 1000;

const TIME_OFFSET = 9;
const TIME_LENGTH = 2;
const DEFAULT_TIMEZONE = "Asia/Seoul";

export const getTimeFromIndex = (index: number): string => {
  const startHours =
    index === TIME_TABLE_ROWS
      ? "00"
      : Math.floor(index / 2)
          .toString()
          .padStart(TIME_LENGTH, "0");

  return index % 2 === 0 ? `${startHours}:00` : `${startHours}:30`;
};

export const getTimezoneIndexFromDate = (
  date: Dayjs,
  timezone = DEFAULT_TIMEZONE
) => {
  date.tz(timezone);
  const hours = date.hour();
  const minutes = date.minute();

  return hours * 2 + (minutes >= MINUTES_PER_TIME_BLOCK ? 1 : 0);
};

export const getTimezoneIndexFromDatetime = (datetime: string) =>
  getTimezoneIndexFromDate(dayjs(datetime));

export const getTimezoneDateStringFromDate = (
  date: Dayjs,
  timezone = DEFAULT_TIMEZONE
) => date.tz(timezone).format("YYYY-MM-DD");

export const getIsOneHourLeft = (datetime: string) =>
  dayjs().diff(datetime) <= ONE_HOUR;

export const getTimezoneCurrentDate = (timezone = DEFAULT_TIMEZONE) =>
  dayjs().tz(timezone).hour(0).minute(0).second(0).millisecond(0);

// TODO 추후 API 변경 시 dayjs utc 로 변경 예정
// * 서버와 통신시 쓰이는 절대시간을 생성하는 함수로 변경 예정
export const getDatetimeString = (dateString: string, index: number) => {
  const date = new Date(`${dateString} ${getTimeFromIndex(index)}`);

  date.setHours(date.getHours() + TIME_OFFSET);

  if (index === TIME_TABLE_ROWS) {
    date.setDate(date.getDate() + 1);
  }

  const datetimeString = date.toISOString();

  return datetimeString.slice(0, datetimeString.length - 1);
};

// * 위도, 경도를 통해 timezone을 받아오는 함수 나중에 구현
export const getTimezone = () => DEFAULT_TIMEZONE;
