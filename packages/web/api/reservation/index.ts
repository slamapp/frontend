import { http } from "~/api/core"
import type { InfiniteScrollResponse, ListDTO } from "~/types/common"
import type { APICourt, APIReservation, APIUser } from "~/types/domains"

export default {
  getMyUpcomingReservations: () =>
    http.auth.get<ListDTO<APIReservation>>("/reservations/upcoming"),

  getMyExpiredReservations: ({
    isFirst,
    lastId,
  }:
    | { isFirst: true; lastId: null }
    | { isFirst: false; lastId: APIReservation["id"] | null }) =>
    http.auth.get<InfiniteScrollResponse<APIReservation>>(
      "/reservations/expired",
      {
        params: {
          isFirst,
          lastId: isFirst ? null : lastId,
          size: 5,
        },
      }
    ),

  getMyReservationParticipants: ({
    courtId,
    startTime,
    endTime,
  }: {
    courtId: APICourt["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
  }) =>
    http.auth.get<{
      participants: {
        userId: APIUser["id"]
        nickname: APIUser["nickname"]
        profileImage: APIUser["profileImage"]
        isFollowed: boolean
      }[]
    }>(`/reservations/${courtId}/${startTime}/${endTime}`),

  createReservation: (data: {
    courtId: APIReservation["court"]["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
    hasBall: boolean
  }) =>
    http.auth.post<{
      reservationId: APIReservation["id"]
      courtId: APIReservation["court"]["id"]
      startTime: APIReservation["startTime"]
      endTime: APIReservation["endTime"]
      hasBall: APIReservation["hasBall"]
      userId: APIReservation["creator"]["id"]
      createdAt: APIReservation["createdAt"]
      updatedAt: APIReservation["updatedAt"]
    }>("/reservations", { data }),
} as const
