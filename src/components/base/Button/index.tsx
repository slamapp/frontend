import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  size?: Size;
  secondary?: boolean;
  fullWidth?: boolean;
  block?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  fullWidth,
  block,
  secondary,
  size = "md",
}) => {
  return (
    <StyledButton
      block={block}
      size={size}
      fullWidth={fullWidth}
      secondary={secondary}
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
    padding: ${theme.buttonPaddings[size!]};
    background-color: ${theme.colors.gray900};
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes[fontSizeMap[size!] as Size]};
    border-radius: ${theme.borderRadiuses[size!]};
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
