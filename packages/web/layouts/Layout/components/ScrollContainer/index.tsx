import type { ReactNode, RefObject } from "react"
import { createContext, useContext, useRef } from "react"
import { css, useTheme } from "@emotion/react"

type Value = {
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

  const scrollToTop = () => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollContainerHeight = ref.current?.getClientRects()[0].height ?? 0
  const scrollContainerWidth = ref.current?.getClientRects()[0].width ?? 0

  return (
    <Context.Provider
      value={{
        scrollContainerRef: ref,
        scrollToTop,
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
