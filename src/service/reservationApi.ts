import { request, authRequest, authFileRequest } from "./fetcher";

interface IReservation {
  courtId: number;
  startTime: string;
  endTime: string;
  hasBall: boolean;
}

const reservationApi = {
  getMyReservations: <R>() => authRequest.get<R, R>("/reservations/upcoming"),
  getMyUpcomingReservations: () => authRequest.get("/reservations/upcoming"),
  getMyExpiredReservations: <R>(
    isFirst: boolean,
    lastId: number | undefined | null
  ) => {
    return lastId
      ? authRequest.get<R, R>("/reservations/expired", {
          params: {
            isFirst,
            lastId,
            size: 2,
          },
        })
      : authRequest.get<R, R>("/reservations/expired", {
          params: { isFirst, lastId: "0", size: 2 },
        });
  },
  getMyReservationParticipants: <R>({ courtId, startTime, endTime }: any) =>
    authRequest.get<R, R>(`/reservations/${courtId}/${startTime}/${endTime}`),
  createReservation: (data: IReservation) =>
    authRequest.post("/reservations", data),
  updateReservation: (
    reservationId: number | string,
    data: Omit<IReservation, "courtId">
  ) => authRequest.patch(`/reservations/${reservationId}`, data),
  deleteReservation: <R>(reservationId: number | string) =>
    authRequest.delete<R, R>(`/reservations/${reservationId}`),
};

export default reservationApi;
