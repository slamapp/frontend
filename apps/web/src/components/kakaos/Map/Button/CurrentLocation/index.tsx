import { css } from '@emotion/react'
import type { Coord } from '@slam/types'
import { motion } from 'framer-motion'
import { IconButton } from '~/components/uis'
import { useMap } from '../../context'

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
    navigator.geolocation.getCurrentPosition(successCallback, failCallback, options)
  }
}

const CurrentLocationButton = () => {
  const { map, render } = useMap()
  const handleClick = () => {
    getCurrentLocation(([latitude, longitude]) => {
      map?.panTo(new kakao.maps.LatLng(latitude, longitude))
      setTimeout(() => {
        render()
      }, 400)
    })
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onTapStart={handleClick}
      css={css`
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 10;
      `}
    >
      <IconButton icon={{ name: 'crosshair', color: '#6B94E5' }} border="none" bgColor="white" />
    </motion.div>
  )
}

export default CurrentLocationButton
