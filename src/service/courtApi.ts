import { AxiosResponse } from "axios";
import { request, authRequest, authFileRequest } from "./fetcher";

const courtApi = {
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
  getCourtDetail: <R>(courtId: number) =>
    request.get<R, R>(`/courts/detail/${courtId}`),
  getAllCourtReservationsByDate: <R>(courtId: string, date: string) =>
    authRequest.get<R, R>(`/courts/${courtId}/reservations/${date}`),
};

export default courtApi;
