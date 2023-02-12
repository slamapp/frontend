import { CSSProperties, ReactNode } from 'react'
import Button from './Button'
import Container from './Container'
import { Provider } from './context/Provider'
import LoadingIndicator from './LoadingIndicator'
import Marker from './Marker'

// 서울의 경도, 위도
export const DEFAULT_INITIAL_CENTER = { latitude: 37.5665, longitude: 126.978 }

type Props = {
  center?: { latitude: number; longitude: number }
  level?: number
  minLevel?: number
  maxLevel?: number
  draggable?: boolean
  zoomable?: boolean
  onClick?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onDragStart?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onDragEnd?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
  onZoomChanged?: (map: kakao.maps.Map) => void
  onLoaded?: (map: kakao.maps.Map) => void
  onBoundChange?: (map: kakao.maps.Map) => void
  style?: CSSProperties
  children?: ReactNode
}

const Map = ({
  center = DEFAULT_INITIAL_CENTER,
  level = 6,
  minLevel = 1,
  maxLevel = 8,
  draggable = true,
  zoomable = true,
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
      center={center}
      level={level}
      minLevel={minLevel}
      maxLevel={maxLevel}
      onLoaded={onLoaded}
      onBoundChange={onBoundChange}
      draggable={draggable}
      zoomable={zoomable}
    >
      <Container
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
