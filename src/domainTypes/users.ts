export const roles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

type RoleMap = typeof roles;

export type Role = RoleMap[keyof RoleMap];

export interface EditableUserProfile {
  nickname: string;
  description: string;
  proficiency: ProficiencyKeyUnion;
  positions: PositionKeyUnion[];
}

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
export type ProficiencyValueUnion =
  | Proficiency[keyof Proficiency]
  | "선택한 숙련도가 없습니다";
export type ProficiencyKeyUnion = keyof Proficiency | null;
