import type { HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import { css } from '@emotion/react'
import { useIsomorphicLayoutEffect } from '@slam/hooks'

const FullHeight = ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const [height, setHeight] = useState(0)

  useIsomorphicLayoutEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <div
      css={css`
        height: ${height}px;
        overflow: hidden;
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default FullHeight
