import type { ReactNode } from "react"
import useStomp from "./useStomp"

interface Props {
  children: ReactNode
}

const SocketProvider = ({ children }: Props) => {
  const { isConnected, isLoading } = useStomp()

  return <>{children}</>
}

export default SocketProvider
