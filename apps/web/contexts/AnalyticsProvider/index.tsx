import { ReactNode, createContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import GA from 'react-ga4'
import { env } from '~/constants'

interface ContextProps {
  sendPageview: (pathname: string) => void
}
const Context = createContext<ContextProps>({} as ContextProps)

interface Props {
  children: ReactNode
}

const sendPageview = (pathname: string) => {
  GA.send({ hitType: 'pageview', page: pathname })
}

const AnalyticsProvider = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => GA.initialize([{ trackingId: env.GOOGLE_ANALYTICS_TRACKING_ID }]), [])

  useEffect(() => {
    sendPageview(router.pathname)
  }, [router.pathname])

  const value = useMemo(() => ({ sendPageview }), [sendPageview])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default AnalyticsProvider
