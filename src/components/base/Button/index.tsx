import type { ReactNode, MouseEvent, CSSProperties } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  size?: Size;
  type?: "button" | "submit";
  secondary?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  style?: CSSProperties;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({
  children,
  fullWidth = false,
  block = false,
  secondary = false,
  type = "button",
  size = "md",
  style,
  onClick,
}) => {
  return (
    <StyledButton
      block={block}
      size={size}
      type={type}
      fullWidth={fullWidth}
      secondary={secondary}
      onClick={onClick}
      style={style}
    >
      {children}
    </StyledButton>
  );
};

const fontSizeMap: { [key in Size]: string } = {
  sm: "xs",
  md: "sm",
  lg: "base",
};

const StyledButton = styled.button<Omit<Props, "children">>`
  ${({ theme, size, fullWidth, block }) => css`
    display: ${block ? "block" : "inline-block"};
    width: ${fullWidth && "100%"};
    padding: ${theme.buttonPaddings[size as Size]};
    background-color: ${theme.colors.gray900};
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes[fontSizeMap[size as Size] as Size]};
    border-radius: ${theme.borderRadiuses[size as Size]};
  `}

  ${({ theme, secondary }) =>
    secondary &&
    css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray900};
    `}
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default Button;
