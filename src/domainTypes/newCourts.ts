export const status = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const;

type Status = typeof status;
export type StatusValueUnion = Status[keyof Status];
export type StatusKeyUnion = keyof Status;
