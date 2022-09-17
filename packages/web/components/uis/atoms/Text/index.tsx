import type { FC, ReactNode } from "react"
import styled from "@emotion/styled"

interface Props {
  className?: string
  children: ReactNode
  block?: boolean
  paragraph?: boolean
  size?: number | "xs" | "sm" | "base" | "md" | "lg" | "xl"
  strong?: boolean
  underline?: boolean
  delete?: boolean
  color?: string
  mark?: boolean
  code?: boolean

  [x: string]: any
}

const Text: FC<Props> = ({
  className,
  children,
  block,
  paragraph,
  size = "base",
  strong,
  underline,
  delete: del,
  color,
  mark,
  code,
  ...rest
}) => {
  const Tag = block ? "div" : paragraph ? "p" : "span"

  const StyledText = styled(Tag)<Props>`
    font-size: ${({ theme }) => {
      return typeof size === "string"
        ? theme.previousTheme.fontSizes[size]
        : `${size}px`
    }};
    color: ${({ theme }) => theme.previousTheme.colors.gray900};
    color: ${color && color};
    font-weight: ${strong && "bold"};
    text-decoration: ${underline && "underline"};
  `

  if (mark) {
    children = <mark>{children}</mark>
  }
  if (code) {
    children = <code>{children}</code>
  }
  if (del) {
    children = <del>{children}</del>
  }

  return (
    <StyledText className={className} style={{ ...rest.style }} {...rest}>
      {children}
    </StyledText>
  )
}

export default Text
