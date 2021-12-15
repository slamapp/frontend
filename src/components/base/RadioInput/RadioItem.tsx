import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Text } from "@components/base";

interface RadioItemProps {
  value: string;
  text: string;
  checked: boolean;
}

const RadioItem: React.FC<RadioItemProps> = ({ value, text, checked }) => {
  return (
    <Label>
      <StyledRadio
        type="radio"
        value={value}
        checked={checked}
        onChange={() => {}}
      />
      <Text size="xs" strong>
        {text}
      </Text>
    </Label>
  );
};

const Label = styled.label`
  margin-right: ${({ theme }) => theme.gaps.xs};
`;

const StyledRadio = styled.input`
  display: none;

  ${({ theme }) => css`
    & + span {
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray700};
      border-radius: ${theme.borderRadiuses.lg};
      padding: ${theme.chipPadding};
      display: inline-block;
      margin-bottom: ${theme.gaps.xs};
      cursor: pointer;

      &:hover {
        background-color: ${theme.colors.gray300};
      }
    }

    &:checked + span {
      background-color: ${theme.colors.gray900};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.gray500};
      }
    }
  `}
`;

export default RadioItem;
