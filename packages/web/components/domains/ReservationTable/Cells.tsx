import type { APIReservation } from "~/types/domains/objects"
import Cell from "./Cell"
import { useReservationTableContext } from "./context"

type Props = {
  data: { [date: string]: APIReservation[] }
}

const Cells = ({ data }: Props) => {
  const { dates } = useReservationTableContext()

  return (
    <>
      {dates
        .map(
          // 하루의 표 48개 생성
          (date) => {
            const cells = Array.from(Array(48).keys()).map((_, index) => ({
              timeNumber: index,
              intersectingTitle: date,
              date,
            }))

            return cells
          }
        )
        .map((cells) => {
          return cells.map(({ intersectingTitle, timeNumber }) => {
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
                isBottom={isBottom}
                timeNumber={timeNumber}
              >
                {isTop && <div>{intersectingTitle}</div>}
                {isOddTimeNumber
                  ? `${hour}시 - ${hour}시 30분`
                  : `${hour}시  30분 - ${hour + 1}시`}
                {isBottom && <div>{intersectingTitle}</div>}
              </Cell>
            )
          })
        })}
    </>
  )
}

export default Cells
