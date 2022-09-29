import { useEffect } from "react"
import { useMap } from "../context"

const useMapEvent = (
  target: kakao.maps.event.EventTarget | null,
  type: string,
  callback?: (map: kakao.maps.Map) => void
) => {
  const { map, render } = useMap()
  const handler = () => {
    if (map) {
      callback?.(map)
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
