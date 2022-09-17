import { useCallback, useMemo } from "react"
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
  const stepWidth = useCallback(
    (ratio: number) => Math.floor(ratio / stepPercentage) * stepPercentage,
    [stepPercentage]
  )

  // 정갈한 Paragraph 모양을 위한 Step Percentage
  const middleLineWidthRandomRatio = useMemo(
    () => stepWidth(80 + Math.floor(Math.random() * 20)),
    [stepWidth]
  )
  const lastLineWidthRandomRatio = useMemo(
    () => stepWidth(20 + Math.floor(Math.random() * 80)),
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
