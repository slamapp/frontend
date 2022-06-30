import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"

export interface ContextProps {
  intersectingTitleCountMap: { [date: string]: number }
  setIntersectingTitleCountMap: Dispatch<
    SetStateAction<{ [date: string]: number }>
  >
  tableCellHeight: number
  dates: string[]
  setDates: Dispatch<SetStateAction<string[]>>
  replaceNewDate: (
    option: "add" | "subtract",
    callback?: ({ isAddedCells }: { isAddedCells: boolean }) => void
  ) => void
}

export const ReservationTableContext = createContext({} as ContextProps)

export const useReservationTableContext = () =>
  useContext(ReservationTableContext)
