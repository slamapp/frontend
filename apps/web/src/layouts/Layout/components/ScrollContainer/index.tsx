import type { ReactNode, RefObject } from 'react'
import { createContext, useContext, useMemo, useRef } from 'react'
import { css, useTheme } from '@emotion/react'

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
  const to = (top: number) => ref.current?.scrollTo({ top, behavior: 'smooth' })
  const toTop = () => to(0)
  const height = ref.current?.getClientRects()[0].height ?? 0
  const width = ref.current?.getClientRects()[0].width ?? 0

  const value = useMemo(() => ({ to, toTop, ref, height, width }), [to, toTop, ref, height, width])

  return (
    <Context.Provider value={value}>
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
