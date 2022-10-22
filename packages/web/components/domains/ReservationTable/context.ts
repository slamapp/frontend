import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"
import type { APICourt } from "~/types/domains/objects/court"

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
  courtId: APICourt["id"]
  isFetching: boolean
}

export const ReservationTableContext = createContext({} as ContextProps)

export const useReservationTableContext = () =>
  useContext(ReservationTableContext)
