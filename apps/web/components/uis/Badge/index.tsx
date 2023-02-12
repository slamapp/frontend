import { ReactNode } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface Props {
  children: ReactNode
  count: number
  maxCount?: number
  showZero?: boolean
  dot?: boolean
  backgroundColor?: string
  textColor?: string
}

const Badge = ({
  children,
  count,
  maxCount = Infinity,
  showZero = false,
  dot = true,
  backgroundColor,
  textColor,
}: Props) => {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  }

  let badge = null
  if (count > 0) {
    if (dot) {
      badge = <Super className="dot" style={colorStyle} />
    } else {
      badge = <Super style={colorStyle}>{maxCount && count > maxCount ? `${maxCount}+` : count}</Super>
    }
  } else if (count === 0) {
    if (dot) {
      badge = showZero ? <Super className="dot" style={colorStyle} /> : null
    } else {
      badge = showZero ? <Super style={colorStyle}>0</Super> : null
    }
  }

  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
      `}
    >
      {children}
      {badge}
    </div>
  )
}

export default Badge

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  color: white;
  font-size: 12px;
  background-color: #f44;
  border-radius: 20px;
  transform: translate(50%, -50%);

  &.dot {
    width: 6px;
    height: 6px;
    padding: 0;
    border-radius: 50%;
  }
`
