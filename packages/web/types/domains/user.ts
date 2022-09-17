import type { APICommon, Keyof } from "~/types/common"

export interface APIUser extends APICommon {
  description: string | null
  email: string | null
  profileImage: string | null
  role: Keyof<typeof roleType>
  positions: Keyof<typeof positionType>[]
  proficiency: Keyof<typeof proficiencyType> | null
  nickname: string
}

export const roleType = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const

export const proficiencyType = {
  BEGINNER: "뉴비",
  INTERMEDIATE: "중수",
  MASTER: "고수",
} as const

export const positionType = {
  PF: "파워포워드",
  SF: "스몰포워드",
  SG: "슈팅가드",
  PG: "포인트가드",
  C: "센터",
  TBD: "미정",
} as const
