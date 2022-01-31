import type { ApiPromise } from "@service/type";

export interface ReservationApi {
  getMyReservations: () => ApiPromise;
  getMyUpcomingReservations: () => ApiPromise;
  getMyExpiredReservations: (...params: any[]) => ApiPromise;
  getMyReservationParticipants: (...params: any[]) => ApiPromise;
  createReservation: (...params: any[]) => ApiPromise;
  updateReservation: (...params: any[]) => ApiPromise;
  deleteReservation: (...params: any[]) => ApiPromise;
}
