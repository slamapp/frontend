import type { ReactNode, RefObject } from "react"
import { createContext, useContext, useRef } from "react"
import { css, useTheme } from "@emotion/react"

type Value = {
  scrollTo: (top: number) => void
  scrollToTop: () => void
  scrollContainerRef: RefObject<HTMLDivElement>
  scrollContainerHeight: number
  scrollContainerWidth: number
}

const Context = createContext({} as Value)

export const useScrollContainer = () => useContext(Context)

type Props = {
  children: ReactNode
}

const ScrollContainer = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const theme = useTheme()

  const scrollTo = (top: number) =>
    ref.current?.scrollTo({ top, behavior: "smooth" })
  const scrollToTop = () => scrollTo(0)

  const scrollContainerHeight = ref.current?.getClientRects()[0].height ?? 0
  const scrollContainerWidth = ref.current?.getClientRects()[0].width ?? 0

  return (
    <Context.Provider
      value={{
        scrollTo,
        scrollToTop,
        scrollContainerRef: ref,
        scrollContainerHeight,
        scrollContainerWidth,
      }}
    >
      <div
        ref={ref}
        id="scrolled-container"
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
          background-color: ${theme.colors.gray0050};
          flex: 1;
          ::-webkit-scrollbar {
            width: 0px;
          }
        `}
      >
        {children}
      </div>
    </Context.Provider>
  )
}

export default ScrollContainer
