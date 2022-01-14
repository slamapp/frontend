import dayjs from "dayjs";
import {
  getTimeFromIndex,
  getIndexFromDateString,
  getDateStringFromDate,
  getDatetimeString,
} from "./date";

describe("인덱스를 시간 문자열로 변환하기", () => {
  it("0 to 00:00", () => {
    expect(getTimeFromIndex(0)).toBe("00:00");
  });

  it("14 to 07:00", () => {
    expect(getTimeFromIndex(14)).toBe("07:00");
  });

  it("48 to 00:00", () => {
    expect(getTimeFromIndex(48)).toBe("00:00");
  });
});

describe("시간을 인덱스로 변환하기", () => {
  it("2022-01-02 00:00 to 0", () => {
    expect(getIndexFromDateString("2022-01-02 00:00")).toBe(0);
  });

  it("2022-01-02 11:30 to 23", () => {
    expect(getIndexFromDateString("2022-01-02 11:30")).toBe(23);
  });
});

describe("시간을 인덱스로 변환하기", () => {
  it("2022-01-02 00:00 to 0", () => {
    expect(getIndexFromDateString("2022-01-02 00:00")).toBe(0);
  });

  it("2022-01-02 11:30 to 23", () => {
    expect(getIndexFromDateString("2022-01-02 11:30")).toBe(23);
  });
});

describe("date 객체를 날짜 문자열로 변환하기", () => {
  it("2022-1-2 to 2022-01-02", () => {
    expect(getDateStringFromDate(dayjs("2022-1-2"))).toBe("2022-01-02");
  });

  it("2022-12-28 to 2022-12-28", () => {
    expect(getDateStringFromDate(dayjs("2022-12-28"))).toBe("2022-12-28");
  });
});

describe("date string과 index를 datetime string으로 변환하기", () => {
  it("2022-1-2, 0 to 2022-01-02T00:00:00.000", () => {
    expect(getDatetimeString("2022-1-2", 0)).toBe("2022-01-02T00:00:00.000");
  });

  it("2022-12-28, 48 to 2022-12-29T00:00:00.000", () => {
    expect(getDatetimeString("2022-12-28", 48)).toBe("2022-12-29T00:00:00.000");
  });

  it("2022-12-31, 48 to 2023-01-01T00:00:00.000", () => {
    expect(getDatetimeString("2022-12-31", 48)).toBe("2023-01-01T00:00:00.000");
  });
});