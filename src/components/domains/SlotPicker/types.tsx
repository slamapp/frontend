const slots = {
  dawn: "새벽",
  morning: "아침",
  afternoon: "낮",
  night: "밤",
} as const;

type Slot = typeof slots;
export type SlotValueUnion = Slot[keyof Slot];
export type SlotKeyUnion = keyof Slot;
