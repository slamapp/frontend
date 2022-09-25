import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "~/hooks"
import { Context } from "."

const DEFAULT_LATITUDE = 37.5665
const DEFAULT_LONGITUDE = 126.978

type Props = {
  onLoaded?: (map: kakao.maps.Map) => void
  onBoundChange?: (map: kakao.maps.Map) => void
  debounceDelay?: number
  children: ReactNode
}

export const Provider = ({
  onLoaded,
  onBoundChange,
  debounceDelay = 200,
  children,
}: Props) => {
  const [, setRender] = useState({})
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    kakao.maps.load(() => {
      if (mapRef.current) {
        const newMap = new window.kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE),
          level: 6,
        })

        setMap(newMap)
        onLoaded?.(newMap)
      }
    })
  }, [])

  const bounds = map?.getBounds()
  const northEast = bounds?.getNorthEast()
  const southWest = bounds?.getSouthWest()

  const debouncedNorthEastLat = useDebounce(northEast?.getLat(), debounceDelay)
  const debouncedNorthEastLng = useDebounce(northEast?.getLng(), debounceDelay)
  const debouncedSouthWestLat = useDebounce(southWest?.getLat(), debounceDelay)
  const debouncedSouthWestLng = useDebounce(southWest?.getLng(), debounceDelay)

  useEffect(() => {
    if (map) {
      requestAnimationFrame(() => {
        onBoundChange?.(map)
      })
    }
  }, [
    debouncedNorthEastLat,
    debouncedNorthEastLng,
    debouncedSouthWestLat,
    debouncedSouthWestLng,
  ])

  return (
    <Context.Provider value={{ map, mapRef, setRender }}>
      {children}
    </Context.Provider>
  )
}
