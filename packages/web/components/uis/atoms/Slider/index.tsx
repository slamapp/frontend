import { useCallback, useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"

interface Props {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  onChange?: (value: number) => void
  [x: string]: any
}

const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [value, setValue] = useState(defaultValue || min)

  const handleMouseDown = useCallback(() => {
    setDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setDragging(false)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) {
        return
      }

      const handleOffset = e.pageX - sliderRef.current!.offsetLeft
      const sliderWidth = sliderRef.current!.offsetWidth

      const track = handleOffset / sliderWidth
      let newValue
      if (track < 0) {
        newValue = min
      } else if (track > 1) {
        newValue = max
      } else {
        newValue = Math.round((min + (max - min) * track) / step) * step
        newValue = Math.min(max, Math.max(min, newValue))
      }

      setValue(newValue)
      if (onChange) {
        onChange(value)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step])

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Track style={{ width: `${percentage}%` }} />
      <Handle
        onMouseDown={handleMouseDown}
        style={{ left: `${percentage}%` }}
      />
    </SliderContainer>
  )
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border: 2px solid #44b;
  border-radius: 50%;
  background-color: white;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
`

export default Slider
