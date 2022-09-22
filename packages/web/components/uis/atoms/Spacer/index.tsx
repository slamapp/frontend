import type { CSSProperties, ReactNode } from "react"
import { forwardRef } from "react"
import { css, useTheme } from "@emotion/react"
import type previousTheme from "~/styles/emotionTheme/previousTheme"
import type { Keyof } from "~/types/common"

type Props = {
  gap?: Keyof<typeof previousTheme["gaps"]> | number
  type?: "vertical" | "horizontal"
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
  style?: CSSProperties
  children?: ReactNode
}

const Spacer = forwardRef<HTMLDivElement, Props>(
  ({ children, type = "vertical", align, justify, gap = 0, style }, ref) => {
    const theme = useTheme()

    return (
      <div
        ref={ref}
        css={css`
          display: flex;
          flex-direction: ${type === "vertical" && "column"};
          gap: ${typeof gap === "string"
            ? theme.previousTheme.gaps[gap]
            : `${gap}px`};
          justify-content: ${justify};
          align-items: ${align};
        `}
        style={style}
      >
        {children}
      </div>
    )
  }
)

export default Spacer
