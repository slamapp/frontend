import { DependencyList, useEffect } from 'react'
import useAsyncFn, { AsyncFn } from './useAsyncFn'

interface StateProps {
  isLoading: boolean
  value?: any
}

const useAsync = (fn: AsyncFn, deps: DependencyList): StateProps => {
  const [state, callback] = useAsyncFn(fn, deps)

  useEffect(() => {
    callback()
  }, [callback])

  return state
}

export default useAsync
