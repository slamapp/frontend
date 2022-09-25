import { useCallback, useEffect } from "react"
import { useMap } from "../context"

const useMapEvent = (
  type: string,
  callback?: (target: kakao.maps.Map) => void
) => {
  const { map } = useMap()
  const handler = useCallback(() => {
    if (map) {
      callback?.(map)
    }
  }, [callback, map])

  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, type, handler)

      return () => kakao.maps.event.removeListener(map, type, handler)
    }
  }, [handler, map, type])
}

export default useMapEvent
