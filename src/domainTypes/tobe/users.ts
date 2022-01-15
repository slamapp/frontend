import type { CommonObject } from "./common";

export interface User extends CommonObject {
  description: string;
  nickname: string;
  profileImage: string;
  role: Role;
  positions: PositionKey[];
  proficiency: ProficiencyKey;
}

export const roles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

type RoleMap = typeof roles;
export type Role = RoleMap[keyof RoleMap];

const positionType = {
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

const proficiencyType = {
  BEGINNER: "뉴비",
  INTERMEDIATE: "중수",
  MASTER: "고수",
} as const;

type ProficiencyMap = typeof proficiencyType;

export type ProficiencyValue =
  | ProficiencyMap[keyof ProficiencyMap]
  | "선택한 숙련도가 없습니다";
export type ProficiencyKey = keyof ProficiencyMap | null;

export type EditableUserProfile = Pick<
  User,
  "nickname" | "description" | "proficiency" | "positions"
>;
