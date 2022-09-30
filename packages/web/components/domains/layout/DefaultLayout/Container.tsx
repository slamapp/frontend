import type { ReactNode } from "react"
import { forwardRef, useEffect, useState } from "react"
import { css, useTheme } from "@emotion/react"

const Container = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => {
    const theme = useTheme()
    const [height, setHeight] = useState<number>(0)

    const handleResize = () => setHeight(window.innerHeight)

    useEffect(() => {
      handleResize()
      window.addEventListener("resize", handleResize)

      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
      <div
        ref={ref}
        id="scrolled-container"
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
          max-width: 640px;
          margin: auto;
          background-color: ${theme.previousTheme.colors.gray50};
          height: ${`${height}`}px;

          ::-webkit-scrollbar {
            width: 0px;
          }
        `}
      >
        {children}
      </div>
    )
  }
)

export default Container
