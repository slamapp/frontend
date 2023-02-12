import { useEffect, useRef } from 'react'

type Handler = (e: Event) => void

const events = ['mousedown', 'touchstart']

const useClickAway = <T extends HTMLElement>(handler: Handler) => {
  const ref = useRef<T>(null)
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const handleEvent = (e: Event) => {
      if (!element.contains(e.target as Node)) {
        savedHandler.current(e)
      }
    }

    events.forEach((eventName) => document.addEventListener(eventName, handleEvent))

    return () => events.forEach((eventName) => document.removeEventListener(eventName, handleEvent))
  }, [ref])

  return ref
}

export default useClickAway
