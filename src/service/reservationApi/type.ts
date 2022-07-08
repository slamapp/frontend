import type { ApiPromise } from "~/service/type"
import type { ListDTO, InfiniteScrollDTO } from "~/types/common"
import type { APIReservation, APICourt, APIUser } from "~/types/domains"

export interface ReservationApi {
  getMyUpcomingReservations: () => ApiPromise<ListDTO<APIReservation[]>>

  getMyExpiredReservations: (
    isFirst: boolean,
    lastId: number | undefined | null
  ) => ApiPromise<InfiniteScrollDTO<APIReservation[]>>

  getMyReservationParticipants: (props: {
    courtId: APICourt["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
  }) => ApiPromise<{
    participants: {
      userId: APIUser["id"]
      nickname: APIUser["nickname"]
      profileImage: APIUser["profileImage"]
      isFollowed: boolean
    }[]
  }>

  createReservation: (data: {
    courtId: APIReservation["court"]["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
    hasBall: boolean
  }) => ApiPromise<{
    reservationId: APIReservation["id"]
    courtId: APIReservation["court"]["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
    hasBall: APIReservation["hasBall"]
    userId: APIReservation["creator"]["id"]
    createdAt: APIReservation["createdAt"]
    updatedAt: APIReservation["updatedAt"]
  }>
}
