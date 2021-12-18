import {
  ProficiencyKeyUnion,
  ProficiencyValueUnion,
  PositionKeyUnion,
  PositionValueUnion,
} from "@components/domain";

export const getKoreanProficiency = (proficiency: ProficiencyKeyUnion) => {
  switch (proficiency) {
    case "BEGINNER":
      return "뉴비";
    case "INTERMEDIATE":
      return "중수";
    case "MASTER":
      return "고수";
    default:
      return "정보 없음";
  }
};

const getKoreanPosition = (englishPosition: PositionKeyUnion) => {
  switch (englishPosition) {
    case "C":
      return "센터";
    case "PF":
      return "파워포워드";
    case "SF":
      return "스몰포워드";
    case "PG":
      return "포인트가드";
    case "SG":
      return "슈팅가드";
    default:
      return "미정";
  }
};

type TransLatedPosition = {
  english: PositionKeyUnion;
  korean: PositionValueUnion;
};

export const getTranslatedPositions = (
  englishPositions: PositionKeyUnion[]
): TransLatedPosition[] =>
  englishPositions.map((englishPosition) => {
    const koreanPosition = getKoreanPosition(englishPosition);
    return { english: englishPosition, korean: koreanPosition };
  });
