import type { ReactNode, MouseEvent, CSSProperties } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = "sm" | "md" | "lg";

interface Props {
  children: ReactNode;
  className?: string;
  size?: Size;
  type?: "button" | "submit";
  secondary?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({
  className,
  children,
  fullWidth = false,
  block = false,
  disabled = false,
  secondary = false,
  type = "button",
  size = "md",
  style,
  onClick,
}) => {
  return (
    <StyledButton
      className={className}
      block={block}
      size={size}
      type={type}
      fullWidth={fullWidth}
      secondary={secondary}
      onClick={onClick}
      style={style}
      disabled={disabled}
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
    height: ${theme.buttonHeights[size!]};
    width: ${fullWidth && "100%"};
    padding: 0 ${theme.buttonRightLeftPaddings[size as Size]};
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

  &:disabled {
    cursor: not-allowed;
    filter: contrast(-0.8);
  }
`;

export default Button;
