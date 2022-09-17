import type { APICommon, OmitAt } from "~/types/common"
import type { APICourt, APIUser } from "~/types/domains"

export interface APIReservation extends APICommon {
  numberOfReservations: number
  startTime: string
  endTime: string
  hasBall: boolean
  court: OmitAt<APICourt>
  creator: OmitAt<APIUser>
}
