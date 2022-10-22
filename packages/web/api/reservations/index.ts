import { http } from "~/api/core"
import type { CursorList, List } from "~/types/domains/lists"
import type { CursorListRequestOption } from "~/types/domains/lists/CursorList"
import type { APICourt, APIReservation, APIUser } from "~/types/domains/objects"

export default {
  getMyUpcomingReservations: () =>
    http.auth.get<List<APIReservation>>("/reservations/upcoming"),

  getMyExpiredReservations: ({
    isFirst,
    lastId = null,
    size = 5,
  }: CursorListRequestOption<APIReservation>) =>
    http.auth.get<CursorList<APIReservation>>("/reservations/expired", {
      params: { isFirst, lastId, size },
    }),

  getReservationsAtDate: (params: { courtId: APICourt["id"]; date: string }) =>
    http.auth.get<List<APIReservation>>("/reservations", { params }),

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
