export interface Reservation {
  reservationId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  basketCount: number;
  numberOfReservations: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
