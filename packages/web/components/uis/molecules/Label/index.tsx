import type { ReactNode, HTMLAttributes } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

interface Props extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode
  size?: number | "xs" | "sm" | "base" | "md" | "lg" | "xl"
  isRequired?: boolean
  [x: string]: any
}

const Label = ({ size, isRequired, children, ...props }: Props) => {
  return (
    <StyledText size={size ?? "base"} strong {...props} block>
      {children}
      {isRequired ? <RequiredTag>*</RequiredTag> : null}
    </StyledText>
  )
}

export default Label

const StyledText = styled(Text)`
  ${({ theme }) => css`
    margin-bottom: ${theme.previousTheme.gaps.xs};
    color: ${theme.previousTheme.colors.gray900};
  `}
`

const RequiredTag = styled.span`
  ${({ theme }) => css`
    color: ${theme.previousTheme.colors.slam.orange.strong};
    vertical-align: text-top;
  `}
`
