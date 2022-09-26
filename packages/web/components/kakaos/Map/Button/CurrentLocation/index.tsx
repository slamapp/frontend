import { css } from "@emotion/react"
import { motion } from "framer-motion"
import { IconButton } from "~/components/uis/molecules"
import type { Coord } from "~/types/domains"
import { useMap } from "../../context"

// 서울의 경도, 위도
export const DEFAULT_POSITION: Coord = [37.5665, 126.978]

const getCurrentLocation = (callback: (coord: Coord) => void) => {
  const options = {
    // 아래 옵션을 켤 경우 느려짐
    // enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  const successCallback: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords
    callback([latitude, longitude])
  }

  const failCallback: PositionErrorCallback = (error) => {
    console.warn(`에러 ${error.code}: ${error.message}`)
    callback(DEFAULT_POSITION)
  }

  if (navigator) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      failCallback,
      options
    )
  }
}

const CurrentLocationButton = () => {
  const { map, setRender } = useMap()
  const handleClick = () => {
    getCurrentLocation(([latitude, longitude]) => {
      map?.panTo(new kakao.maps.LatLng(latitude, longitude))
      setTimeout(() => {
        setRender((prev) => ({ ...prev }))
      }, 400)
    })
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      css={css`
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 10;
      `}
    >
      <IconButton
        name="crosshair"
        type="button"
        iconColor="#6B94E5"
        onClick={handleClick}
        noOutlined
      />
    </motion.div>
  )
}

export default CurrentLocationButton
