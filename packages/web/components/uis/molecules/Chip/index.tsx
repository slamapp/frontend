import type { ReactNode, HTMLAttributes } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  size?: number | "xs" | "sm" | "base" | "md" | "lg" | "xl"
  clickable?: boolean
  border?: boolean
  secondary?: boolean
}

const Chip = ({
  size = "xs",
  children,
  clickable = false,
  border = false,
  secondary = false,
  ...props
}: Props) => {
  return (
    <ChipItem
      size={size}
      color="white"
      strong
      {...props}
      clickable={clickable}
      border={border}
      secondary={secondary}
    >
      {children}
    </ChipItem>
  )
}

export default Chip

const ChipItem = styled(Text)`
  ${({ theme }) => css`
    background-color: ${theme.previousTheme.colors.white};
    color: ${theme.previousTheme.colors.gray700};

    border-radius: ${theme.previousTheme.borderRadiuses.lg};
    padding: ${theme.previousTheme.chipPadding};
    display: inline-block;
    margin-bottom: ${theme.previousTheme.gaps.xs};
    cursor: default;
  `}

  ${({ theme, clickable }) =>
    clickable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.previousTheme.colors.gray300};
      }
    `}

  ${({ theme, secondary }) =>
    secondary &&
    css`
      background-color: ${theme.previousTheme.colors.gray900};
      color: ${theme.previousTheme.colors.white};
    `}

  ${({ theme, border }) =>
    border &&
    css`
      border: 1px solid ${theme.previousTheme.colors.gray300};
    `}
`
