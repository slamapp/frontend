import type { ReactNode } from "react"
import AnalyticsProvider from "./AnalyticsProvider"
import { AuthProvider, NavigationProvider, SocketProvider } from "."

interface Props {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </NavigationProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default Providers
