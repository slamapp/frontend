import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const courtApi: Api = {
  getCourtsByCoordsAndDate: <R>({
    date,
    time,
    startLatitude,
    endLatitude,
    startLongitude,
    endLongitude,
  }: any) =>
    request.get<R, R>(`/courts`, {
      params: {
        date,
        latitude: `${startLatitude},${endLatitude}`,
        longitude: `${startLongitude},${endLongitude}`,
        time,
      },
    }),
  createNewCourt: (data: any) => authRequest.post(`/courts/new`, data),
  getCourtDetail: <R>(courtId: number, date: string, time: string) =>
    request.get<R, R>(`/courts/detail/${courtId}/${date}/${time}`),
  getAllCourtReservationsByDate: <R>(courtId: string, date: string) =>
    authRequest.get<R, R>(`/courts/${courtId}/reservations/${date}`),
};

export default courtApi;
