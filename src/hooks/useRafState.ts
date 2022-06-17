import { useCallback, useRef, useState } from "react"

// 루프 내에서 주어진 함수를 호출합니다.
const useRafState = <T>(
  initialState: T
): [state: T, setRafState: (value: any) => void] => {
  const frame = useRef<number>(0)
  const [state, setState] = useState<T>(initialState)

  const setRafState = useCallback((value) => {
    cancelAnimationFrame(frame!.current)

    frame.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  return [state, setRafState]
}

export default useRafState
