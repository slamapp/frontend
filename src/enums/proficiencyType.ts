export const proficiencyType = {
  BEGINNER: "뉴비",
  INTERMEDIATE: "중수",
  MASTER: "고수",
} as const

type Proficiency = typeof proficiencyType
export type ProficiencyValue =
  | Proficiency[keyof Proficiency]
  | "선택한 숙련도가 없습니다"
export type ProficiencyKey = keyof Proficiency | null
