import { request, authRequest, authFileRequest } from "../fetcher";
import { ReservationApi } from "./type";

interface IReservation {
  courtId: number;
  startTime: string;
  endTime: string;
  hasBall: boolean;
}

const reservationApi: ReservationApi = {
  getMyReservations: () => authRequest.get("/reservations/upcoming"),
  getMyUpcomingReservations: () => authRequest.get("/reservations/upcoming"),
  getMyExpiredReservations: (
    isFirst: boolean,
    lastId: number | undefined | null
  ) => {
    return lastId
      ? authRequest.get("/reservations/expired", {
          params: {
            isFirst,
            lastId,
            size: 2,
          },
        })
      : authRequest.get("/reservations/expired", {
          params: { isFirst, lastId: "0", size: 5 },
        });
  },
  getMyReservationParticipants: ({ courtId, startTime, endTime }: any) =>
    authRequest.get(`/reservations/${courtId}/${startTime}/${endTime}`),
  createReservation: (data: IReservation) =>
    authRequest.post("/reservations", data),
  updateReservation: (
    reservationId: number | string,
    data: Omit<IReservation, "courtId">
  ) => authRequest.patch(`/reservations/${reservationId}`, data),
  deleteReservation: (reservationId: number | string) =>
    authRequest.delete(`/reservations/${reservationId}`),
};

export default reservationApi;
