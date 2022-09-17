import { createContext } from "react"

const initialValues = {
  map: undefined,
  handleInitMap: () => {},
}

interface ContextValues {
  map: kakao.maps.Map | undefined
  handleInitMap: (map: kakao.maps.Map) => void
}
const Context = createContext<ContextValues>(initialValues)

export default Context
