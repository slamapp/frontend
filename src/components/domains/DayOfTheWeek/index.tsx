import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

const SUNDAY_INDEX = 0
const SATURDAY_INDEX = 6

const DayOfTheWeek = styled(Text)<{ index: number }>`
  margin-bottom: 10px;
  color: ${({ index, theme }) => {
    if (index === SUNDAY_INDEX) {
      return theme.previousTheme.colors.red.middle
    } else if (index === SATURDAY_INDEX) {
      return theme.previousTheme.colors.blue.middle
    } else {
      return theme.previousTheme.colors.gray700
    }
  }};
`

export default DayOfTheWeek
