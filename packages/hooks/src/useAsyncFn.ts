import type { DependencyList } from 'react'
import { useCallback, useRef, useState } from 'react'

export type AsyncFn = (...args: any[]) => Promise<any>

interface StateProps<T> {
  isLoading: boolean
  value?: T
  error?: unknown
}

const useAsyncFn = <Args extends any[], T>(
  fn: (...args: Args) => Promise<T>,
  deps: DependencyList
): [state: StateProps<T>, callback: typeof fn] => {
  const lastCallId = useRef(0)
  const [state, setState] = useState<StateProps<T>>({
    isLoading: false,
    value: undefined,
    error: undefined,
  })

  const callback = useCallback((...args: Parameters<typeof fn>) => {
    const callId = lastCallId.current + 1

    if (!state.isLoading) {
      setState({ ...state, isLoading: true })
    }

    return fn(...args).then(
      (value) => {
        if (callId === lastCallId.current) {
          setState({ value, isLoading: false })
        }

        return value
      },
      (error) => {
        if (callId === lastCallId.current) {
          setState({ error, isLoading: false })
        }

        return error
      }
    )
  }, deps)

  return [state, callback]
}

export default useAsyncFn
