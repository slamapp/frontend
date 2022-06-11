import { request, authRequest, authFileRequest } from "../fetcher";
import type { ReservationApi } from "./type";

const reservationApi: ReservationApi = {
  getMyUpcomingReservations: () => authRequest.get("/reservations/upcoming"),
  getMyExpiredReservations: (isFirst, lastId) => {
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
  getMyReservationParticipants: ({ courtId, startTime, endTime }) =>
    authRequest.get(`/reservations/${courtId}/${startTime}/${endTime}`),
  createReservation: (data) => authRequest.post("/reservations", data),
};

export default reservationApi;
