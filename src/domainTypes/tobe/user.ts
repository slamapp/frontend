import { Role, PositionKey, ProficiencyKey } from "@enums/.";
import type { APICommon } from "./common";

export interface APIUser extends APICommon {
  description: string;
  nickname: string;
  profileImage: string;
  role: Role;
  positions: PositionKey[];
  proficiency: ProficiencyKey;
}

export type EditableUserProfile = Pick<
  APIUser,
  "nickname" | "description" | "proficiency" | "positions"
>;
