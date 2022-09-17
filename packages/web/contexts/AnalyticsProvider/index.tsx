import type { ReactNode } from "react"
import Context from "./context"
import { sendPageview } from "./handle"
import { useInitialize, usePageSend } from "./hooks"

interface Props {
  children: ReactNode
}

const AnalyticsProvider = ({ children }: Props) => {
  useInitialize()
  usePageSend()

  return (
    <Context.Provider value={{ sendPageview }}>{children}</Context.Provider>
  )
}

export default AnalyticsProvider
