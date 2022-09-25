import type { CSSProperties, ReactNode } from "react"
import { useEffect } from "react"
import { useMap } from "../context"
import useMapEvent from "../hooks/useMapEvent"

type Props = {
  center?: { latitude: number; longitude: number }
  onClick?: (map: kakao.maps.Map) => void
  onDragStart?: (map: kakao.maps.Map) => void
  onDragEnd?: (map: kakao.maps.Map) => void
  onZoomChanged?: (map: kakao.maps.Map) => void
  style?: CSSProperties
  children?: ReactNode
}

const Container = ({
  center,
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  style,
  children,
}: Props) => {
  const { map, mapRef } = useMap()

  useEffect(() => {
    if (center) {
      map?.setCenter(new kakao.maps.LatLng(center.latitude, center.longitude))
    }

    map?.relayout()
  }, [map, center, style])

  useMapEvent(map, "click", onClick)
  useMapEvent(map, "dragstart", onDragStart)
  useMapEvent(map, "dragend", onDragEnd)
  useMapEvent(map, "zoom_changed", onZoomChanged)

  return (
    <div ref={mapRef} style={{ zIndex: 0, ...style }}>
      {children}
    </div>
  )
}

export default Container
