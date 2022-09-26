import { http } from "~/api/core"
import type {
  APICourt,
  APINewCourt,
  APIReservation,
  APIUser,
} from "~/types/domains"

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
  }) =>
    http.default.get<{ court: APICourt; reservationMaxCount: number }[]>(
      `/courts`,
      {
        params: {
          date,
          latitude: `${startLatitude},${endLatitude}`,
          longitude: `${startLongitude},${endLongitude}`,
          time,
        },
      }
    ),

  createNewCourt: (
    data: Pick<
      APICourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  ) => http.auth.post<APINewCourt>(`/courts/new`, { data }),

  getCourtDetail: (
    courtId: APICourt["id"],
    {
      date,
      time,
    }: {
      date: string
      time: "dawn" | "morning" | "afternoon" | "night"
    }
  ) =>
    http.default.get<
      Pick<
        APICourt,
        | "basketCount"
        | "createdAt"
        | "id"
        | "image"
        | "latitude"
        | "longitude"
        | "name"
        | "texture"
        | "updatedAt"
      > & {
        reservationMaxCount: number
      }
    >(`/courts/${courtId}/detail`, {
      params: {
        date,
        time,
      },
    }),

  getAllCourtReservationsByDate: (courtId: APICourt["id"], date: string) =>
    http.auth.get<{
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
    }>(`/courts/${courtId}/reservations/${date}`),
}

export default courtApi
