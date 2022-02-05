import type { ApiPromise } from "@service/type";
import type { APIReservation, APICourt } from "@domainTypes/tobe";

export interface ReservationApi {
  getMyReservations: () => ApiPromise;
  getMyUpcomingReservations: () => ApiPromise;
  getMyExpiredReservations: (...params: any[]) => ApiPromise;
  getMyReservationParticipants: (param: {
    courtId: APICourt["id"];
    startTime: APIReservation["startTime"];
    endTime: APIReservation["endTime"];
  }) => ApiPromise<{ participants: { [prop: string]: any }[] }>;
  createReservation: (...params: any[]) => ApiPromise;
  updateReservation: (...params: any[]) => ApiPromise;
  deleteReservation: (...params: any[]) => ApiPromise;
}
