import React, { CSSProperties } from "react";
import type { MouseEvent, ReactNode } from "react";
import { Button } from "@components/base";
import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";

interface Props {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  bottom?: number;
}

const BottomFixedButton: React.FC<Props> = ({
  children,
  type,
  disabled,
  onClick,
  style,
  className,
  bottom,
}) => {
  return typeof document !== "undefined" ? (
    ReactDOM.createPortal(
      <Background bottom={bottom}>
        <Button
          type={type}
          disabled={disabled}
          fullWidth
          onClick={onClick}
          size="lg"
          className={className}
          style={style}
        >
          {children}
        </Button>
      </Background>,
      document.querySelector("#scrolled-container")!
    )
  ) : (
    <></>
  );
};

export const BottomFixedContainer: React.FC = ({
  custom,
  children,
  className,
}: any) =>
  typeof document !== "undefined" ? (
    ReactDOM.createPortal(
      <Background custom className={className}>
        {children}
      </Background>,
      document.querySelector("#scrolled-container")!
    )
  ) : (
    <></>
  );

const Background = styled.div<Pick<Props, "bottom"> & { custom?: boolean }>`
  box-sizing: border-box;
  position: fixed;
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : 0)};
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
  }
  ${({ custom }) =>
    !custom &&
    css`
      button {
        width: calc(100% - 40px); // 100% - theme.gaps.base * 2
      }
    `}
`;

export default BottomFixedButton;
