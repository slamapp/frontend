const typeEnums = {
  feat: "새로운 기능 추가 시",
  fix: "버그 해결 / 수정 시",
  docs: "도큐멘테이션 추가 또는 수정 시",
  revert: "작업 되돌리기 시",
  style: "스타일 추가시",
  remove: "불필요한 파일 제거 시",
  perf: "성능 개선 시",
  refactor: "리팩토링 시",
  ci: "CI 구성 파일 및 스크립트 변경 시",
  config: "설정파일 변경 / 추가시",
  chore: "의존성 패키지 추가 / 그 외 기타",
}

const maxSpaceLength = Object.keys(typeEnums).reduce(
  (acc, { length }) => (length > acc ? length : acc),
  0
)

const commitizenConfig = {
  types: Object.entries(typeEnums).map(([type, description]) => ({
    value: type,
    name:
      `${type}:     ${" ".repeat(maxSpaceLength - type.length)}` + description,
  })),
  allowBreakingChanges: ["feat", "fix", "remove"],
  messages: {
    type: "커밋메시지의 타입을 설정해주세요:",
    scope: "\n변경하려는 스코프는 무엇인가요? (optional):",
    // used if allowCustomScopes is true
    customScope: "변경하려는 스코프는 무엇인가요?:",
    subject: "변화에 대한 짧고 간결한 설명을 적어주세요:\n",
    body: '변화의 길고 자세한 설명을 적어주세요: (optional). "|"로 개행할 수 있어요:\n',
    breaking: "BREAKING CHANGES으로 추가할 내용이 있나요? (optional):\n",
    footer:
      "이 변화로 인해 ISSUES CLOSED으로 추가할 내용이 있나요? (optional). E.g.: #31, #34:\n",
    confirmCommit: "이대로 커밋할까요?",
  },
}

module.exports = commitizenConfig
