import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { useNavigationValue } from '../atoms'
import { useSetNavigation } from '../atoms'

type Props = Pick<ReturnType<typeof useNavigationValue>, 'top' | 'bottom'> & {
  children: ReactNode
}

const Navigation = ({ top = null, bottom = false, children }: Props) => {
  const set = useSetNavigation()

  useEffect(() => {
    set.all({
      top,
      bottom,
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
