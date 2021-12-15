import React from "react";
import type { MouseEvent, ReactNode } from "react";
import { Button } from "@components/base";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const BottomFixedButton: React.FC<Props> = ({
  children,
  type,
  disabled,
  onClick,
}) => {
  return (
    <Background>
      <Button
        type={type}
        disabled={disabled}
        fullWidth
        onClick={onClick}
        size="lg"
      >
        {children}
      </Button>
    </Background>
  );
};
const Background = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120px;
  z-index: 2000;
  background: ${({ theme }) =>
    `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${theme.colors.white} 55%)`};
  padding: ${({ theme }) => theme.gaps.base};
  max-width: 640px;

  button {
    position: absolute;
    bottom: ${({ theme }) => theme.gaps.base};
    width: calc(100% - 40px); // 100% - theme.gaps.base * 2
  }
`;

export default BottomFixedButton;
