import { Role, PositionKey, ProficiencyKey } from "@enums/.";
import type { APICommon } from "./common";

export interface APIUser extends APICommon {
  description: string | null;
  nickname: string;
  profileImage: string | null;
  role: Role;
  positions: PositionKey[];
  proficiency: ProficiencyKey;
  email: string;
}

export type EditableUserProfile = Pick<
  APIUser,
  "nickname" | "description" | "proficiency" | "positions"
>;
