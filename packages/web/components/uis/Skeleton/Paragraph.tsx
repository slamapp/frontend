import { useCallback, useEffect, useMemo, useState } from "react"
import Box from "./Box"

interface Props {
  line?: number
  fontSize?: number
  lineHeight?: number
  stepPercentage?: number
  lineBreak?: number
}

const Paragraph = ({
  line = 3,
  fontSize = 16,
  lineHeight = 1.6,
  stepPercentage = 10,
  lineBreak = 4,
}: Props) => {
  const [randomMiddle, setRandomMiddle] = useState(0)
  const [randomLast, setRandomLast] = useState(0)

  useEffect(() => {
    setRandomMiddle(Math.floor(Math.random() * 20))
    setRandomLast(Math.floor(Math.random() * 80))
  }, [])

  const stepWidth = useCallback(
    (ratio: number) => Math.floor(ratio / stepPercentage) * stepPercentage,
    [stepPercentage]
  )

  // 정갈한 Paragraph 모양을 위한 Step Percentage
  const middleLineWidthRandomRatio = useMemo(
    () => stepWidth(80 + randomMiddle),
    [stepWidth]
  )
  const lastLineWidthRandomRatio = useMemo(
    () => stepWidth(20 + randomLast),
    [stepWidth]
  )

  return (
    <div style={{ fontSize, lineHeight }}>
      {Array.from(Array(line), (_, index) =>
        index === line - 1 ? (
          <Box
            width={`${lastLineWidthRandomRatio}%`}
            height={fontSize}
            key={index}
          />
        ) : (index + 1) % lineBreak === 0 ? (
          <Box
            width={`${middleLineWidthRandomRatio}%`}
            height={fontSize}
            key={index}
          />
        ) : (
          <Box width="100%" height={fontSize} key={index} />
        )
      )}
    </div>
  )
}

export default Paragraph
