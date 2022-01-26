import { request, authRequest, authFileRequest } from "../fetcher";
import { CourtApi } from "./type";

const courtApi: CourtApi = {
  getCourtsByCoordsAndDate: ({
    date,
    time,
    startLatitude,
    endLatitude,
    startLongitude,
    endLongitude,
  }) =>
    request.get(`/courts`, {
      params: {
        date,
        latitude: `${startLatitude},${endLatitude}`,
        longitude: `${startLongitude},${endLongitude}`,
        time,
      },
    }),
  createNewCourt: (data) => authRequest.post(`/courts/new`, data),
  getCourtDetail: (courtId: number, date: string, time: string) =>
    request.get(`/courts/detail/${courtId}/${date}/${time}`),
  getAllCourtReservationsByDate: (courtId: string, date: string) =>
    authRequest.get(`/courts/${courtId}/reservations/${date}`),
};

export default courtApi;
