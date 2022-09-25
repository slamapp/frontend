import type { Dispatch, RefObject, SetStateAction } from "react"
import { createContext, useContext } from "react"

export const Context = createContext({
  map: null,
  mapRef: { current: null },
} as {
  map: kakao.maps.Map | null
  mapRef: RefObject<HTMLDivElement>
  setRender: Dispatch<SetStateAction<object>>
})

export const useMap = () => useContext(Context)
