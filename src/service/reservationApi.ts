import { request, authRequest, authFileRequest } from "./fetcher";

const reservationAPI = {
  getMyReservations: () => authRequest.get("/reservations/upcoming"),
};

export default reservationAPI;
