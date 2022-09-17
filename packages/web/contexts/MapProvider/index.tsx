import type { ReactNode } from "react"
import { useCallback, useState } from "react"
import Context from "./context"

interface Props {
  children: ReactNode
}

const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<kakao.maps.Map>()

  const handleInitMap = useCallback((map: kakao.maps.Map) => {
    setMap(map)
  }, [])

  return (
    <Context.Provider value={{ map, handleInitMap }}>
      {children}
    </Context.Provider>
  )
}

export default MapProvider
