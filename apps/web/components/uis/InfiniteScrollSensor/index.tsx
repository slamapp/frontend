import { ReactElement, RefObject, useEffect, useRef } from 'react'
import { useIntersectionObserver } from '~/hooks'

const InfiniteScrollSensor = ({
  onIntersected,
  render,
}: {
  onIntersected: (entry?: IntersectionObserverEntry) => void
  render: (ref: RefObject<HTMLDivElement>) => ReactElement
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, { threshold: 0.1 })

  useEffect(() => {
    if (entry?.isIntersecting) {
      onIntersected(entry)
    }
  }, [entry?.isIntersecting, onIntersected, entry])

  return render(ref)
}

export default InfiniteScrollSensor
