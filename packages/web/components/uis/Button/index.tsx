import type { CSSProperties, MouseEvent, ReactNode } from "react"
import { Spinner } from "@chakra-ui/react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

type Size = "sm" | "md" | "lg"

interface Props {
  children?: ReactNode
  className?: string
  size?: Size
  type?: "button" | "submit"
  secondary?: boolean
  tertiary?: boolean
  fullWidth?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  style?: CSSProperties
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  className,
  children,
  fullWidth = false,
  block = false,
  loading = false,
  disabled = false,
  secondary = false,
  tertiary = false,
  type = "button",
  size = "md",
  style,
  onClick,
}: Props) => {
  return (
    <StyledButton
      className={className}
      block={block}
      size={size}
      type={type}
      fullWidth={fullWidth}
      secondary={secondary}
      tertiary={tertiary}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        `}
      >
        {loading && <Spinner />} {children}
      </div>
    </StyledButton>
  )
}

const fontSizeMap: { [key in Size]: string } = {
  sm: "xs",
  md: "sm",
  lg: "base",
}

const StyledButton = styled.button<Omit<Props, "children">>`
  ${({ theme, size, fullWidth, block }) => css`
    display: ${block ? "block" : "inline-block"};
    height: ${theme.previousTheme.buttonHeights[size!]};
    width: ${fullWidth && "100%"};
    padding: 0 18px;
    white-space: nowrap;

    font-size: ${theme.previousTheme.fontSizes[
      fontSizeMap[size as Size] as Size
    ]};
    border-radius: ${theme.previousTheme.borderRadiuses[size as Size]};
    transition: all 200ms;
  `}

  ${({ theme }) =>
    css`
      background-color: ${theme.colors.gray0900};
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.gray0200};

      :hover {
        opacity: 0.8;
      }
    `}

  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;

  ${({ theme, secondary }) =>
    secondary &&
    css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray0900};
      border: 1px solid ${theme.colors.gray0200};

      :hover {
        opacity: 0.8;
      }
    `}

  ${({ theme, tertiary }) =>
    tertiary &&
    css`
      background-color: ${theme.colors.gray0200};
      color: ${theme.colors.gray0900};
      border: 1px solid ${theme.colors.gray0300};

      :hover {
        opacity: 0.8;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    filter: contrast(-0.8);
    opacity: 0.8;
  }
`

export default Button
