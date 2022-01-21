export const positionType = {
  PF: "파워포워드",
  SF: "스몰포워드",
  SG: "슈팅가드",
  PG: "포인트가드",
  C: "센터",
  TBD: "미정",
} as const;

type PositionMap = typeof positionType;
export type PositionValue = PositionMap[keyof PositionMap];
export type PositionKey = keyof PositionMap;
