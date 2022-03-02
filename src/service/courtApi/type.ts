import type {
  APICourt,
  APIReservation,
  APIUser,
  OmitAt,
} from "@domainTypes/tobe";
import type { SlotKeyUnion } from "@enums/timeSlotType";
import type { ApiPromise } from "@service/type";

export interface CourtApi {
  getCourtsByCoordsAndDate: (coordsRangeAndDateAndTime: {
    date: string;
    time: string;
    startLatitude: number;
    endLatitude: number;
    startLongitude: number;
    endLongitude: number;
  }) => ApiPromise<{
    contents: { court: APICourt; reservationMaxCount: number }[];
  }>;
  // NOTE newCourt 또는 admin으로 옮겨져야 함
  createNewCourt: (...params: any[]) => ApiPromise;
  getCourtDetail: (
    courtId: APICourt["id"],
    date: string,
    timeSlot: SlotKeyUnion
  ) => ApiPromise<{ court: APICourt; reservationMaxCount: number }>;
  getAllCourtReservationsByDate: (
    courtId: APICourt["id"],
    date: string
  ) => ApiPromise<{
    contents: (Omit<OmitAt<APIReservation>, "court"> &
      Pick<APIUser, "profileImage">)[];
  }>;
}
