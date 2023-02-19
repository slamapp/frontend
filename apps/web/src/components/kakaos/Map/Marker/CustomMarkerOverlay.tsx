import { ReactNode, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useMap } from '../context'

type Props = {
  position: { latitude: number; longitude: number }
  children: ReactNode
}

const CustomMarkerOverlay = forwardRef<kakao.maps.CustomOverlay, Props>(function CustomMarkerOverlay(
  { position, children },
  ref
) {
  const { map } = useMap()

  const container = useRef(document.createElement('div'))

  const overlayPosition = useMemo(() => {
    return new kakao.maps.LatLng(position.latitude, position.longitude)
  }, [position.latitude, position.longitude])

  const overlay = useMemo(() => {
    const kakaoCustomOverlay = new kakao.maps.CustomOverlay({
      clickable: true,
      position: overlayPosition,
      content: container.current,
    })
    container.current.style.display = 'none'

    return kakaoCustomOverlay
  }, [overlayPosition])

  useImperativeHandle(ref, () => overlay, [overlay])

  useEffect(() => {
    overlay.setMap(map)

    return () => overlay.setMap(null)
  }, [overlay, map])

  return container.current.parentElement && createPortal(children, container.current.parentElement)
})

export default CustomMarkerOverlay
