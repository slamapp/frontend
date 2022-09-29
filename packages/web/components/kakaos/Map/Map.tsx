import type { CSSProperties, ReactNode } from "react"
import Button from "./Button"
import Container from "./Container"
import { Provider } from "./context/Provider"
import LoadingIndicator from "./LoadingIndicator"
import Marker from "./Marker"

type Props = {
  initialCenter: { latitude: number; longitude: number }
  initialLevel?: number
  maxLevel?: number
  center?: { latitude: number; longitude: number }
  onClick?: (target: kakao.maps.Map) => void
  onDragStart?: (target: kakao.maps.Map) => void
  onDragEnd?: (target: kakao.maps.Map) => void
  onZoomChanged?: (target: kakao.maps.Map) => void
  onLoaded?: (map: kakao.maps.Map) => void
  onBoundChange?: (map: kakao.maps.Map) => void
  style?: CSSProperties
  fallback?: ReactNode
  children?: ReactNode
}

const Map = ({
  initialCenter,
  initialLevel = 6,
  maxLevel = 8,
  center,
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  style,
  onLoaded,
  onBoundChange,
  children,
}: Props) => {
  return (
    <Provider
      initialCenter={initialCenter}
      initialLevel={initialLevel}
      maxLevel={maxLevel}
      onLoaded={onLoaded}
      onBoundChange={onBoundChange}
    >
      <Container
        center={center}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onZoomChanged={onZoomChanged}
        style={style}
      >
        {children}
      </Container>
    </Provider>
  )
}

Map.Button = Button
Map.Marker = Marker
Map.LoadingIndicator = LoadingIndicator

export default Map
