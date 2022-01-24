import { ApiPromise } from "@service/type";

export interface Api {
  getCourtsByCoordsAndDate: (...params: any[]) => ApiPromise;
  createNewCourt: (...params: any[]) => ApiPromise;
  getCourtDetail: (...params: any[]) => ApiPromise;
  getAllCourtReservationsByDate: (...params: any[]) => ApiPromise;
}
