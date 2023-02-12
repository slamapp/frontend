import { useCallback, useEffect, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Base = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.gray0100};
  `}

  display: inline-block;
  background-position: 0 center;
  background-size: 200% 200%;
  border-radius: 4px;
  animation: skeleton--zoom-in 0.2s ease-out, skeleton--loading 1s infinite;

  @keyframes skeleton--zoom-in {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes skeleton--loading {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`

interface BoxProps {
  width?: number | string
  height?: number | string
}

const Box = styled(Base)<BoxProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
`

interface CircleProps {
  size: number | string
}

const Circle = styled(Base)<CircleProps>`
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  border-radius: 50%;
`

interface ParagraphProps {
  line?: number
  fontSize?: number
  lineHeight?: number
  stepPercentage?: number
  lineBreak?: number
}

export const Paragraph = ({
  line = 3,
  fontSize = 16,
  lineHeight = 1.6,
  stepPercentage = 10,
  lineBreak = 4,
}: ParagraphProps) => {
  const [randomForMiddle, setRandomForMiddle] = useState(0)
  const [randomForLast, setRandomForLast] = useState(0)

  useEffect(() => {
    setRandomForMiddle(Math.random())
    setRandomForLast(Math.random())
  }, [])

  const stepWidth = useCallback(
    (ratio: number) => Math.floor(ratio / stepPercentage) * stepPercentage,
    [stepPercentage]
  )

  // 정갈한 Paragraph 모양을 위한 Step Percentage
  const middleLineWidthRandomRatio = useMemo(
    () => stepWidth(80 + Math.floor(randomForMiddle * 20)),
    [stepWidth, randomForMiddle]
  )
  const lastLineWidthRandomRatio = useMemo(
    () => stepWidth(20 + Math.floor(randomForLast * 80)),
    [stepWidth, randomForLast]
  )

  return (
    <div style={{ fontSize, lineHeight }}>
      {Array.from(Array(line), (_, index) =>
        index === line - 1 ? (
          <Box width={`${lastLineWidthRandomRatio}%`} height={fontSize} key={index} />
        ) : (index + 1) % lineBreak === 0 ? (
          <Box width={`${middleLineWidthRandomRatio}%`} height={fontSize} key={index} />
        ) : (
          <Box width="100%" height={fontSize} key={index} />
        )
      )}
    </div>
  )
}

const Skeleton = {
  Base,
  Box,
  Circle,
  Paragraph,
}

export default Skeleton
