import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { APICourt } from '@slam/types'

export interface ContextProps {
  isNeedToScrollUnderDisabledCell: boolean
  tableCellHeight: number
  setDates: Dispatch<SetStateAction<string[]>>
  dates: string[]
  replaceNewDate: (option: 'add' | 'subtract', callback?: ({ isAddedCells }: { isAddedCells: boolean }) => void) => void
  courtId: APICourt['id']
}

export const Context = createContext({} as ContextProps)

export const useReservationTable = () => useContext(Context)
