import { useEffect } from "react"
import { useMap } from "../context"

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: string,
  callback?: (map: kakao.maps.Map, e: kakao.maps.event.MouseEvent) => void
) => {
  const { map, render } = useMap()
  const handler = (e: kakao.maps.event.MouseEvent) => {
    if (map) {
      callback?.(map, e)
    }

    render()
  }

  useEffect(() => {
    if (target) {
      kakao.maps.event.addListener(target, type, handler)

      return () => kakao.maps.event.removeListener(target, type, handler)
    }
  }, [handler, target, type])
}

export default useMapEvent
