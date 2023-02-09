import type { ReactNode, RefObject } from "react"
import { createContext, useContext, useRef } from "react"
import { css, useTheme } from "@emotion/react"

type Value = {
  to: (top: number) => void
  toTop: () => void
  ref: RefObject<HTMLDivElement>
  height: number
  width: number
}

const Context = createContext({} as Value)

export const useScrollContainer = () => useContext(Context)

type Props = {
  children: ReactNode
}

const ScrollContainer = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const to = (top: number) => ref.current?.scrollTo({ top, behavior: "smooth" })

  return (
    <Context.Provider
      value={{
        to,
        toTop: () => to(0),
        ref,
        height: ref.current?.getClientRects()[0].height ?? 0,
        width: ref.current?.getClientRects()[0].width ?? 0,
      }}
    >
      <div
        ref={ref}
        id="scrolled-container"
        css={css`
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow-x: hidden;
          background-color: ${theme.colors.gray0050};
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
