import type { ReactNode } from "react"
import { createContext } from "react"
import type { PageType } from "./actionTypes"
import type { DataProps } from "./reducer"
import { initialData } from "./reducer"
import type { Events } from "./types"

export interface ContextProps {
  navigationProps: DataProps
  useMountPage: (pageType: PageType) => void
  setNavigationEvent: (events: Events) => void
  setCustomButtonEvent: (title: ReactNode, handleClick: any) => void
  useMountCustomButtonEvent: (
    customButtonName: ReactNode,
    handleClick: (...args: any[]) => void
  ) => void
  clearNavigationEvent: () => void
  setNavigationTitle: (title: ReactNode) => void
  setTopNavIsShrink: (isShrink: boolean) => void
}

const initialContext = {
  navigationProps: initialData,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  setCustomButtonEvent: () => {},
  useMountCustomButtonEvent: () => {},
  clearNavigationEvent: () => {},
  setNavigationTitle: () => {},
  setTopNavIsShrink: () => {},
}

const Context = createContext<ContextProps>(initialContext)

export default Context
