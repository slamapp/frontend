import React from "react"
import Cell from "./Cell"
import { useReservationTableContext } from "./context"

const Cells = () => {
  const { dates } = useReservationTableContext()

  return (
    <>
      {dates
        .map(
          // 하루의 표 48개 생성
          (date) =>
            Array.from(Array(48).keys()).map((_, index) => ({
              timeNumber: index,
              intersectingTitle: date,
            }))
        )
        .reduce(
          // 여러 날의의 표 한배열로 뭉치기
          (acc, cur) =>
            [
              ...acc,
              ...cur.map(({ intersectingTitle, timeNumber }) => {
                const hour = Math.floor(timeNumber / 2)
                const isOddTimeNumber = Math.abs(timeNumber % 2) === 0
                const isTop = hour === 0 && isOddTimeNumber
                const isBottom = hour === 23 && !isOddTimeNumber

                return (
                  <Cell
                    isOddTimeNumber={isOddTimeNumber}
                    key={`${intersectingTitle}-${timeNumber}`}
                    intersectingTitle={intersectingTitle}
                    isTop={isTop}
                    timeNumber={timeNumber}
                  >
                    {isTop && <div>{intersectingTitle}</div>}
                    {isOddTimeNumber
                      ? `${hour}시 - ${hour}시 30분`
                      : `${hour}시  30분 - ${hour + 1}시`}
                    {isBottom && <div>{intersectingTitle}</div>}
                  </Cell>
                )
              }),
            ] as { intersectingTitle: string; timeNumber: number }[],
          []
        )}
    </>
  )
}

export default Cells
