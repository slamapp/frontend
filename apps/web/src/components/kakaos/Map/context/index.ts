import { RefObject, createContext, useContext } from 'react'

export const Context = createContext({
  map: null,
  mapRef: { current: null },
} as {
  map: kakao.maps.Map | null
  mapRef: RefObject<HTMLDivElement>
  render: () => void
})

export const useMap = () => useContext(Context)
