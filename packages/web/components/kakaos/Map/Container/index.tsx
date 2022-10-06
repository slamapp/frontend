import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import { useMap } from "../context"
import useMapEvent from "../hooks/useMapEvent"

type Props = {
  center?: { latitude: number; longitude: number }
  onClick?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onDragStart?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onDragEnd?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onZoomChanged?: (map: kakao.maps.Map) => void
  style?: CSSProperties
  children?: ReactNode
}

const Container = ({
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  style,
  children,
}: Props) => {
  const { map, mapRef } = useMap()

  useMapEvent(map, "click", onClick)
  useMapEvent(map, "dragstart", onDragStart)
  useMapEvent(map, "dragend", onDragEnd)
  useMapEvent(map, "zoom_changed", onZoomChanged)

  return (
    <div ref={mapRef} style={{ zIndex: 0, ...style }}>
      {map ? children : null}
    </div>
  )
}

export default Container
