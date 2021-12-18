import { request, authRequest, authFileRequest } from "./fetcher";

// request: 토큰이 필요없는 익명사용자도 보낼 수 있는 요청
// authRequest: 토큰이 필요한 사용자가 보낼수잇는요청
// authFileRequest: 토큰이 필요한 파일 요청

const reservationAPI = {
  getMyReservations: <R>() => authRequest.get<R, R>("/reservations/upcoming"),
  getMyUpcomingReservations: () => authRequest.get("/reservations/upcoming"),
  getMyExpiredReservations: () => authRequest.get("/reservations/expired"),
  getMyReservationParticipants: <R>({ courtId, startTime, endTime }: any) =>
    authRequest.get<R, R>(`/reservations/${courtId}/${startTime}/${endTime}`),
};

export default reservationAPI;
