import { request, authRequest, authFileRequest } from "./fetcher";

const reservationAPI = {
  getMyReservations: <R>() => authRequest.get<R, R>("/reservations/upcoming"),
};

export default reservationAPI;
