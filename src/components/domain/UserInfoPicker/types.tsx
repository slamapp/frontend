const positions = {
  PF: "파워포워드",
  SF: "스몰포워드",
  SG: "슈팅가드",
  PG: "포인트가드",
  C: "센터",
  TBD: "미정",
} as const;

const proficiencies = {
  BEGINNER: "뉴비",
  INTERMEDIATE: "중수",
  MASTER: "고수",
} as const;

type Position = typeof positions;
export type PositionValueUnion = Position[keyof Position];
export type PositionKeyUnion = keyof Position;

type Proficiency = typeof proficiencies;
export type ProficiencyValueUnion = Proficiency[keyof Proficiency];
export type ProficiencyKeyUnion = keyof Proficiency;
