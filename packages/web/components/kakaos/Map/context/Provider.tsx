import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { Context } from "."

const DEFAULT_LATITUDE = 37.5665
const DEFAULT_LONGITUDE = 126.978

type Props = {
  fallback: ReactNode
  onLoaded?: (map: kakao.maps.Map) => void
  children: ReactNode
}

export const Provider = ({ fallback, onLoaded, children }: Props) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    kakao.maps.load(() => {
      if (mapRef.current) {
        const newMap = new window.kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE),
          level: 3,
        })

        setMap(newMap)
        onLoaded?.(newMap)
      }
    })
  }, [])

  return (
    <Context.Provider value={{ map, mapRef }}>
      {fallback}
      {children}
    </Context.Provider>
  )
}
