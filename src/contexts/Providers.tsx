import type { ReactNode } from "react"
import AnalyticsProvider from "./AnalyticsProvider"
import {
  AuthProvider,
  NavigationProvider,
  SocketProvider,
  MapProvider,
} from "."

interface Props {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <NavigationProvider>
          <MapProvider>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </MapProvider>
        </NavigationProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default Providers
