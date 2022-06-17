import type { APICommon } from "~/domainTypes/tobe"
import type { Role, PositionKey, ProficiencyKey } from "~/enums"

export interface APIUser extends APICommon {
  description: string | null
  email: string | null
  profileImage: string | null
  role: Role
  positions: PositionKey[]
  proficiency: ProficiencyKey
  nickname: string
}
