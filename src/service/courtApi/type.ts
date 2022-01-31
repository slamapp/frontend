import type { ApiPromise } from "@service/type";

export interface CourtApi {
  getCourtsByCoordsAndDate: (...params: any[]) => ApiPromise;
  createNewCourt: (...params: any[]) => ApiPromise;
  getCourtDetail: (...params: any[]) => ApiPromise;
  getAllCourtReservationsByDate: (...params: any[]) => ApiPromise;
}
