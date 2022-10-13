import type { ReactNode } from "react"
import { createContext, useEffect } from "react"
import { useRouter } from "next/router"
import GA from "react-ga4"
import { env } from "~/constants"

interface ContextProps {
  sendPageview: (pathname: string) => void
}
const Context = createContext<ContextProps>({} as ContextProps)

interface Props {
  children: ReactNode
}

const sendPageview = (pathname: string) => {
  GA.send({ hitType: "pageview", page: pathname })
}

const AnalyticsProvider = ({ children }: Props) => {
  const router = useRouter()

  useEffect(
    () => GA.initialize([{ trackingId: env.GOOGLE_ANALYTICS_TRACKING_ID }]),
    []
  )

  useEffect(() => {
    sendPageview(router.pathname)
  }, [router.pathname])

  return (
    <Context.Provider value={{ sendPageview }}>{children}</Context.Provider>
  )
}

export default AnalyticsProvider
