import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Chip } from "@components/base";

interface RadioItemProps {
  value: string;
  text: string;
  checked: boolean;
}

const RadioItem: React.FC<RadioItemProps> = ({ value, text, checked }) => {
  return (
    <StyledLabel>
      <StyledRadio
        type="radio"
        value={value}
        checked={checked}
        onChange={() => {}}
      />
      <Chip clickable>{text}</Chip>
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  margin-right: ${({ theme }) => theme.gaps.xs};
`;

const StyledRadio = styled.input`
  display: none;

  ${({ theme }) => css`
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
