import type {
  positionType,
  proficiencyType,
} from "~/types/domains/objects/user"
import type { Keyof, ValueOf } from "~/types/helpers"

const getKoreanProficiency = (
  englishProficiency: Keyof<typeof proficiencyType>
) => {
  switch (englishProficiency) {
    case "BEGINNER":
      return "뉴비"
    case "INTERMEDIATE":
      return "중수"
    case "MASTER":
      return "고수"
    default:
      return "뉴비"
  }
}

export const getTranslatedProficiency = (
  englishProficiency: Keyof<typeof proficiencyType>
): {
  english: Keyof<typeof proficiencyType>
  korean: ValueOf<typeof proficiencyType>
} => ({
  english: englishProficiency,
  korean: getKoreanProficiency(englishProficiency),
})

const getKoreanPosition = (englishPosition: Keyof<typeof positionType>) => {
  switch (englishPosition) {
    case "C":
      return "센터"
    case "PF":
      return "파워포워드"
    case "SF":
      return "스몰포워드"
    case "PG":
      return "포인트가드"
    case "SG":
      return "슈팅가드"
    default:
      return "미정"
  }
}

export const getTranslatedPositions = (
  englishPositions: Keyof<typeof positionType>[]
): {
  english: Keyof<typeof positionType>
  korean: ValueOf<typeof positionType>
}[] =>
  englishPositions.map((english) => ({
    english,
    korean: getKoreanPosition(english),
  }))
