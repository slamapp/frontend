export const chatType = {
  DEFAULT: "DEFAULT",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type ChatTypeMap = typeof chatType;
export type ChatType = ChatTypeMap[keyof ChatTypeMap];
