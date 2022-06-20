import type { CSSProperties } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type previousTheme from "~/styles/emotionTheme/previousTheme"
import type { Keyof } from "~/types/common"

const Spacer = styled.div<{
  gap?: Keyof<typeof previousTheme["gaps"]> | number
  type?: "vertical" | "horizontal"
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
}>`
  ${({ theme, type = "vertical", align, justify, gap }) => css`
    display: flex;
    flex-direction: ${type === "vertical" && "column"};
    gap: ${typeof gap === "string"
      ? theme.previousTheme.gaps[gap]
      : `${gap}px`};
    justify-content: ${justify};
    align-items: ${align};
  `}
`

export default Spacer
