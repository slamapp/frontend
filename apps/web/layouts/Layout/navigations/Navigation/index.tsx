import { ReactNode, useEffect } from 'react'
import { useNavigationValue, useSetNavigation } from '../atoms'

type Props = Pick<ReturnType<typeof useNavigationValue>, 'top' | 'bottom'> & {
  children: ReactNode
}

const Navigation = ({ top = null, bottom = false, children }: Props) => {
  const set = useSetNavigation()

  useEffect(() => {
    set.all({
      top,
      bottom,
      isLoading: false,
    })

    return () =>
      set.all((prev) => ({
        ...prev,
        top: null,
      }))
  }, [...Object.values(top ?? {}), bottom])

  return <>{children}</>
}

export default Navigation
