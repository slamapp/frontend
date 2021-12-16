import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
import Icon, { FeatherIconNameType } from "../Icon";

interface Props {
  name: FeatherIconNameType;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IconToggle: React.FC<Props> = ({ name, checked, onChange }) => {
  return (
    <StyledIconToggleLabel>
      <Icon name="star" fill={checked} size="sm" />
      <input type="checkbox" checked={checked} onChange={onChange} />
    </StyledIconToggleLabel>
  );
};

export default IconToggle;

const StyledIconToggleLabel = styled.label`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  padding: ${({ theme }) => theme.iconButtonPadding};
  cursor: pointer;
  input {
    display: none;
  }
`;
