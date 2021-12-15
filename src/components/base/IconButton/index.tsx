import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import Icon, { FeatherIconNameType } from "../Icon";

interface Props {
  name: FeatherIconNameType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ name, onClick }: Props) => {
  return (
    <StyledIconButton onClick={onClick}>
      <Icon name={name} />
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
`;
