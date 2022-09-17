import type { InfiniteScrollResponse, ListDTO } from "~/types/common"
import type { APICourt, APIReservation, APIUser } from "~/types/domains"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const reservationApi = {
  getMyUpcomingReservations: (): ApiPromise<ListDTO<APIReservation>> =>
    authRequest.get("/reservations/upcoming"),

  getMyExpiredReservations: ({
    isFirst,
    lastId,
  }:
    | { isFirst: true; lastId: null }
    | { isFirst: false; lastId: APIReservation["id"] | null }): ApiPromise<
    InfiniteScrollResponse<APIReservation>
  > =>
    authRequest.get("/reservations/expired", {
      params: {
        isFirst,
        lastId: isFirst ? null : lastId,
        size: 5,
      },
    }),

  getMyReservationParticipants: ({
    courtId,
    startTime,
    endTime,
  }: {
    courtId: APICourt["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
  }): ApiPromise<{
    participants: {
      userId: APIUser["id"]
      nickname: APIUser["nickname"]
      profileImage: APIUser["profileImage"]
      isFollowed: boolean
    }[]
  }> => authRequest.get(`/reservations/${courtId}/${startTime}/${endTime}`),

  createReservation: (data: {
    courtId: APIReservation["court"]["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
    hasBall: boolean
  }): ApiPromise<{
    reservationId: APIReservation["id"]
    courtId: APIReservation["court"]["id"]
    startTime: APIReservation["startTime"]
    endTime: APIReservation["endTime"]
    hasBall: APIReservation["hasBall"]
    userId: APIReservation["creator"]["id"]
    createdAt: APIReservation["createdAt"]
    updatedAt: APIReservation["updatedAt"]
  }> => authRequest.post("/reservations", data),
}

export default reservationApi
