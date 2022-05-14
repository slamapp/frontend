import type { Role, PositionKey, ProficiencyKey } from "@enums/.";
import type { APICommon } from "@domainTypes/tobe";

export interface APIUser extends APICommon {
  description: string | null;
  nickname: string;
  profileImage: string | null;
  role: Role;
  positions: PositionKey[];
  proficiency: ProficiencyKey;
  email: string;
}
