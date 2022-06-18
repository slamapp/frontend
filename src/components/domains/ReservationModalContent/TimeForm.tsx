import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"
import * as S from "./style"

const TimeInput: React.FC<any> = ({ time, selected, text, onClick }) => {
  return (
    <TimeInputWrapper selected={selected} onClick={onClick}>
      <Text block>{text}</Text>

      <S.TimeSlotText style={{ textAlign: "center" }} isPlaceHolder={!time}>
        {time || "시간 입력"}
      </S.TimeSlotText>
    </TimeInputWrapper>
  )
}

const TimeInputWrapper = styled.span<any>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 120px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.previousTheme.colors.gray100};

  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};
  transition: background-color 200ms ease-in-out;
  padding: 16px;

  :hover {
    background-color: ${({ theme }) => theme.previousTheme.colors.gray300};
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      background-color: ${theme.previousTheme.colors.white};
      z-index: 2;
      box-shadow: ${theme.previousTheme.boxShadows.lg};

      &:hover {
        background-color: ${theme.previousTheme.colors.white};
      }
    `}
`

interface TimeFormProps {
  currentInput: "START" | "END"
  startTime: string
  endTime: string | null
  onSetCurrentInput: (currentInput: string) => void
}

const TimeForm: React.FC<TimeFormProps> = ({
  currentInput,
  startTime,
  endTime,
  onSetCurrentInput,
}) => {
  return (
    <TimeFormContainer>
      <TimeInput
        text="시작 시간"
        selected={currentInput === "START"}
        time={startTime}
        onClick={() => onSetCurrentInput("START")}
      />
      <TimeInput
        text="종료 시간"
        selected={currentInput === "END"}
        time={endTime}
        onClick={() => onSetCurrentInput("END")}
      />
    </TimeFormContainer>
  )
}

const TimeFormContainer = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: ${({ theme }) => theme.previousTheme.colors.gray100};
  border-radius: ${({ theme }) => theme.previousTheme.borderRadiuses.md};
  overflow: hidden;
`

export default TimeForm
