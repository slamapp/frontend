import type { APICourt } from './court'
import type { APIUser } from './user'
import type { Default, OmitAt } from '../abstracts'

export interface APIReservation extends Default {
  numberOfReservations: number
  startTime: string
  endTime: string
  hasBall: boolean
  court: OmitAt<APICourt>
  creator: OmitAt<APIUser>
}
