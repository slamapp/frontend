import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";
import Icon, { FeatherIconNameType } from "../Icon";

interface Props {
  name?: FeatherIconNameType;
  className?: string;
  size?: "sm" | "md" | "lg";
  iconSize?: "sm" | "md" | "lg" | number;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IconToggle: React.FC<Props> = ({
  size = "lg",
  iconSize = "sm",
  name = "star",
  checked,
  onChange,
}) => {
  return (
    <StyledIconToggleLabel size={size}>
      <Icon color={"#FFC700"} name={name} fill={checked} size={iconSize} />
      <input type="checkbox" checked={checked} onChange={onChange} />
    </StyledIconToggleLabel>
  );
};

export default IconToggle;

const StyledIconToggleLabel = styled.label<Required<Pick<Props, "size">>>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  width: ${({ theme, size }) => theme.buttonHeights[size]};
  height: ${({ theme, size }) => theme.buttonHeights[size]};
  cursor: pointer;
  input {
    display: none;
  }
`;
