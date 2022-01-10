import {
  ProficiencyKeyUnion,
  ProficiencyValueUnion,
  PositionKeyUnion,
  PositionValueUnion,
} from "@domainTypes/.";

const getKoreanProficiency = (englishProficiency: ProficiencyKeyUnion) => {
  switch (englishProficiency) {
    case "BEGINNER":
      return "뉴비";
    case "INTERMEDIATE":
      return "중수";
    case "MASTER":
      return "고수";
    default:
      return "선택한 숙련도가 없습니다";
  }
};

type TransLatedProficiency = {
  english: ProficiencyKeyUnion;
  korean: ProficiencyValueUnion;
};

export const getTranslatedProficiency = (
  englishProficiency: ProficiencyKeyUnion
): TransLatedProficiency => ({
  english: englishProficiency,
  korean: getKoreanProficiency(englishProficiency),
});

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
  englishPositions.map((english) => ({
    english,
    korean: getKoreanPosition(english),
  }));
