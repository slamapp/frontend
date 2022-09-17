import type {
  APICourt,
  APINewCourt,
  APIReservation,
  APIUser,
} from "~/types/domains"
import { request, authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const courtApi = {
  getCourtsByCoordsAndDate: ({
    date,
    time,
    startLatitude,
    endLatitude,
    startLongitude,
    endLongitude,
  }: {
    date: string
    startLatitude: APICourt["latitude"]
    startLongitude: APICourt["longitude"]
    endLatitude: APICourt["latitude"]
    endLongitude: APICourt["longitude"]
    time: "dawn" | "morning" | "afternoon" | "night"
  }): ApiPromise<{ court: APICourt; reservationMaxCourt: number }[]> =>
    request.get(`/courts`, {
      params: {
        date,
        latitude: `${startLatitude},${endLatitude}`,
        longitude: `${startLongitude},${endLongitude}`,
        time,
      },
    }),

  createNewCourt: (
    data: Pick<
      APICourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  ): ApiPromise<APINewCourt> => authRequest.post(`/courts/new`, data),

  getCourtDetail: (
    courtId: APICourt["id"],
    date: string,
    time: "dawn" | "morning" | "afternoon" | "night"
  ): ApiPromise<{
    reservationMaxCount: number
    court: APICourt
  }> =>
    request.get(`/courts/${courtId}/detail`, {
      params: {
        date,
        time,
      },
    }),

  getAllCourtReservationsByDate: (
    courtId: APICourt["id"],
    date: string
  ): ApiPromise<{
    courtId: number
    date: string
    reservations: {
      userId: number
      avatarImgSrc: APIUser["profileImage"]
      courtId: number
      reservationId: number
      startTime: APIReservation["startTime"]
      endTime: APIReservation["endTime"]
    }[]
  }> => authRequest.get(`/courts/${courtId}/reservations/${date}`),
}

export default courtApi
