import { createContext } from "react"
import type { APICourt, APIReservation, APIUser } from "~/domainTypes/tobe"

export interface ContextProps {
  sendFollow: (body: { receiverId: APIUser["id"] }) => void
  sendFollowCancel: (body: { receiverId: APIUser["id"] }) => void
  sendLoudSpeaker: (body: {
    courtId: APICourt["id"]
    startTime: APIReservation["startTime"]
    reservationId: APIReservation["id"]
  }) => void
}

export const Context = createContext<ContextProps>({} as ContextProps)
