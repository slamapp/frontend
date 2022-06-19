import type { ApiPromise } from "~/service/type"
import type { APIReservation, APICourt, APIUser } from "~/types/domains"

export interface ReservationApi {
  getMyUpcomingReservations: () => ApiPromise<{
    reservations: {
      basketCount: APIReservation["court"]["basketCount"]
      courtId: number
      courtName: APIReservation["court"]["name"]
      latitude: APIReservation["court"]["latitude"]
      longitude: APIReservation["court"]["longitude"]
      startTime: APIReservation["startTime"]
      endTime: APIReservation["endTime"]
      numberOfReservations: number
      reservationId: number
      createdAt: APIReservation["createdAt"]
      updatedAt: APIReservation["updatedAt"]
    }[]
  }>

  getMyExpiredReservations: (
    isFirst: boolean,
    lastId: number | undefined | null
  ) => ApiPromise<{
    contents: [
      {
        reservationId: APIReservation["id"]
        courtId: APIReservation["court"]["id"]
        latitude: APIReservation["court"]["latitude"]
        longitude: APIReservation["court"]["longitude"]
        courtName: APIReservation["court"]["name"]
        startTime: APIReservation["startTime"]
        endTime: APIReservation["endTime"]
        numberOfReservations: number
        createdAt: APIReservation["createdAt"]
        updatedAt: APIReservation["updatedAt"]
      }
    ]
    lastId: APIReservation["id"]
  }>

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
