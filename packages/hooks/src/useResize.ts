import { useEffect, useRef } from 'react'

type Handler = (contentRect: DOMRectReadOnly) => void

const useResize = <T extends Element>(handler: Handler) => {
  const savedHandler = useRef<Handler>(handler)
  const ref = useRef<T>(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      savedHandler.current(entries[0].contentRect)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return ref
}

export default useResize
