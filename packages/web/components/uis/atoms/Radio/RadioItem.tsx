import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Chip } from "~/components/uis/molecules"

interface RadioItemProps {
  value: string
  text: string
  checked: boolean
  disabled?: boolean
}

const RadioItem: React.FC<RadioItemProps> = ({
  value,
  text,
  checked,
  disabled,
}) => {
  return (
    <StyledLabel>
      <StyledRadio
        type="radio"
        value={value}
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
      />
      <Chip clickable>{text}</Chip>
    </StyledLabel>
  )
}

const StyledLabel = styled.label`
  margin-right: ${({ theme }) => theme.previousTheme.gaps.xs};
`

const StyledRadio = styled.input`
  display: none;

  ${({ theme }) => css`
    + span {
      transition: all 200ms;
    }

    &:enabled {
      &:hover + span {
        background-color: ${theme.previousTheme.colors.gray100};
      }

      &:checked + span {
        background-color: ${theme.previousTheme.colors.gray900};
        color: ${theme.previousTheme.colors.white};

        &:hover {
          background-color: ${theme.previousTheme.colors.gray700};
        }
      }
    }
  `}

  &:disabled + span {
    pointer-events: none;
  }
`

export default RadioItem
