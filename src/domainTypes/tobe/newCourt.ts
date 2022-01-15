import { Court } from "./court";

export interface NewCourt extends Court {
  status: StatusKey;
}

export const statusType = {
  ACCEPT: "승인",
  DENY: "거절",
  READY: "대기",
} as const;

type StatusTypeMap = typeof statusType;
export type StatusValue = StatusTypeMap[keyof StatusTypeMap];
export type StatusKey = keyof StatusTypeMap;
