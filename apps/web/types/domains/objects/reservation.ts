import type { OmitAt } from "../helpers"
import type { Default } from "./abstracts"
import type { APICourt } from "./court"
import type { APIUser } from "./user"

export interface APIReservation extends Default {
  numberOfReservations: number
  startTime: string
  endTime: string
  hasBall: boolean
  court: OmitAt<APICourt>
  creator: OmitAt<APIUser>
}
