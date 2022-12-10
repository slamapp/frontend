import type { Dispatch, SetStateAction } from "react"
import { createContext, useContext } from "react"
import type { APICourt } from "~/types/domains/objects/court"

export interface ContextProps {
  tableCellHeight: number
  setDates: Dispatch<SetStateAction<string[]>>
  dates: string[]
  replaceNewDate: (
    option: "add" | "subtract",
    callback?: ({ isAddedCells }: { isAddedCells: boolean }) => void
  ) => void
  courtId: APICourt["id"]
}

export const Context = createContext({} as ContextProps)

export const useReservationTable = () => useContext(Context)
