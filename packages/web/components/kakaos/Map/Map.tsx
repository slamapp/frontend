import type { CSSProperties, ReactNode } from "react"
import Button from "./Button"
import Container from "./Container"
import { Provider } from "./context/Provider"

type Props = {
  center?: { latitude: number; longitude: number }
  onClick?: (map: kakao.maps.Map) => void
  onDragStart?: (map: kakao.maps.Map) => void
  onDragEnd?: (map: kakao.maps.Map) => void
  onZoomChanged?: (map: kakao.maps.Map) => void
  onLoaded?: (map: kakao.maps.Map) => void
  style?: CSSProperties
  fallback?: ReactNode
  children?: ReactNode
}

const Map = ({
  center,
  onClick,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  style,
  onLoaded,
  fallback,
  children,
}: Props) => {
  return (
    <Provider onLoaded={onLoaded} fallback={fallback}>
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

export default Map
