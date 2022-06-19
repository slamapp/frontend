import type { ApiPromise } from "~/service/type"
import type {
  APICourt,
  APINewCourt,
  APIUser,
  APIReservation,
} from "~/types/domains"

export interface CourtApi {
  getCourtsByCoordsAndDate: (coordsAndDate: {
    date: string
    startLatitude: APICourt["latitude"]
    startLongitude: APICourt["longitude"]
    endLatitude: APICourt["latitude"]
    endLongitude: APICourt["longitude"]
    time: "dawn" | "morning" | "afternoon" | "night"
  }) => ApiPromise<{ court: APICourt; reservationMaxCourt: number }[]>

  createNewCourt: (
    courtData: Pick<
      APINewCourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  ) => ApiPromise<APINewCourt>

  getCourtDetail: (
    courtId: APICourt["id"],
    date: string,
    time: "dawn" | "morning" | "afternoon" | "night"
  ) => ApiPromise<{
    reservationMaxCount: number
    court: APICourt
  }>

  getAllCourtReservationsByDate: (
    courtId: APICourt["id"],
    date: string
  ) => ApiPromise<{
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
  }>
}
