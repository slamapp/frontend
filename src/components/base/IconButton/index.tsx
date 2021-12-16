import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import Icon, { FeatherIconNameType } from "../Icon";

interface Props {
  name: FeatherIconNameType;
  className?: string;
  type?: "button" | "submit";
  iconColor?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({
  name,
  type = "button",
  iconColor,
  className,
  onClick,
}: Props) => {
  return (
    <StyledIconButton className={className} type={type} onClick={onClick}>
      <Icon name={name} color={iconColor} size="sm" />
    </StyledIconButton>
  );
};

export default IconButton;

const StyledIconButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  padding: ${({ theme }) => theme.iconButtonPadding};
  cursor: pointer;
`;
