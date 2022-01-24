import { ApiPromise } from "@service/type";

export interface Api {
  getMyReservations: () => ApiPromise;
  getMyUpcomingReservations: () => ApiPromise;
  getMyExpiredReservations: (...params: any[]) => ApiPromise;
  getMyReservationParticipants: (...params: any[]) => ApiPromise;
  createReservation: (...params: any[]) => ApiPromise;
  updateReservation: (...params: any[]) => ApiPromise;
  deleteReservation: (...params: any[]) => ApiPromise;
}
