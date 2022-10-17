import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useIntersectionObserver } from "~/hooks"
import { useReservationTableContext } from "./context"

const SENSOR_MULTIPLY = 6

const Top = () => {
  const [isSensorOff, setIsSensorOff] = useState(false)
  const { replaceNewDate, tableCellHeight } = useReservationTableContext()
  const sensorRef = useRef<HTMLDivElement>(null)
  const sensorEntry = useIntersectionObserver(sensorRef, {
    threshold: 0.5,
  })
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      if (sensorEntry?.isIntersecting) {
        replaceNewDate("subtract", ({ isAddedCells }) => {
          document.getElementById("scrolled-container")?.scrollTo({
            top:
              // subtract이 실패한 경우(isAddedCells === false)(최소 날짜를 벗어난 요청의 경우, 14일 제한) 새로운 테이블을 받아오지 않았으므로
              (isAddedCells ? tableCellHeight * 48 : 0) +
              Math.abs(sensorRef.current?.getClientRects()[0].height || 0), // 스크롤이 센서의 바텀으로 되어야 함
          })

          if (!isAddedCells) {
            setIsSensorOff(true)
          }
        })
      }
    } else {
      document
        .getElementById("scrolled-container")
        ?.scrollTo({ top: tableCellHeight * SENSOR_MULTIPLY })
    }
    isMounted.current = true
  }, [sensorEntry?.isIntersecting])

  if (isSensorOff) {
    return (
      <>
        <NoAccessScrollMaker />
        <NoAccess>지난 날은 예약할 수 없습니다</NoAccess>
      </>
    )
  }

  return (
    <MoreTableMaker
      ref={sensorRef}
      tableCellHeight={tableCellHeight}
      colorIntersecting={!!sensorEntry?.isIntersecting}
    />
  )
}

const Bottom = () => {
  const [isSensorOff, setIsSensorOff] = useState(false)
  const { replaceNewDate, tableCellHeight } = useReservationTableContext()
  const sensorRef = useRef<HTMLDivElement>(null)
  const sensorEntry = useIntersectionObserver(sensorRef, {})

  useEffect(() => {
    if (sensorEntry?.isIntersecting) {
      replaceNewDate("add", ({ isAddedCells }) => {
        if (!isAddedCells) {
          setIsSensorOff(true)
        }
      })
    }
  }, [sensorEntry?.isIntersecting])

  if (isSensorOff) {
    return <NoAccess>오늘로부터 14일 후는 예약할 수 없습니다</NoAccess>
  }

  return (
    <MoreTableMaker
      ref={sensorRef}
      tableCellHeight={tableCellHeight}
      colorIntersecting={!!sensorEntry?.isIntersecting}
    />
  )
}

const MoreCellSensor = {
  Top,
  Bottom,
}

export default MoreCellSensor

const MoreTableMaker = styled.div<{
  tableCellHeight: number
  colorIntersecting: boolean
}>`
  background-color: ${({ colorIntersecting }) =>
    colorIntersecting ? "blue" : "red"};
  height: ${({ tableCellHeight }) => tableCellHeight * SENSOR_MULTIPLY}px;
`

const NoAccess = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: ${theme.colors.gray0200};
    color: ${theme.colors.gray0500};
  `}
`

const NoAccessScrollMaker = () => {
  const ref = useRef(null)

  const entry = useIntersectionObserver(ref, { threshold: 0.95 })

  useEffect(() => {
    if (entry?.isIntersecting) {
      document
        .getElementById("scrolled-container")
        ?.scrollTo({ top: entry.boundingClientRect.bottom })
    }
  }, [entry?.isIntersecting])

  return <ScrollMaker ref={ref} />
}

const ScrollMaker = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray0200};
    color: ${theme.colors.gray0500};
    height: 20vh;
  `}
`
