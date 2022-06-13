import type {
  APICourt,
  APINewCourt,
  APIUser,
  APIReservation,
} from "~/domainTypes/tobe";
import type { ApiPromise } from "~/service/type";
import type { SlotKeyUnion } from "~/components/domains";

export interface CourtApi {
  getCourtsByCoordsAndDate: (coordsAndDate: {
    date: string;
    startLatitude: APICourt["latitude"];
    startLongitude: APICourt["longitude"];
    endLatitude: APICourt["latitude"];
    endLongitude: APICourt["longitude"];
    time: SlotKeyUnion;
  }) => ApiPromise<{
    courts: {
      courtId: number;
      courtName: APICourt["name"];
      courtReservation: number;
      createdAt: APICourt["createdAt"];
      latitude: APICourt["latitude"];
      longitude: APICourt["longitude"];
      updatedAt: APICourt["updatedAt"];
    }[];
  }>;

  createNewCourt: (
    courtData: Pick<
      APINewCourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  ) => ApiPromise<APINewCourt>;

  getCourtDetail: (
    courtId: APICourt["id"],
    date: string,
    time: string
  ) => ApiPromise<{
    basketCount: APICourt["basketCount"];
    courtName: APICourt["name"];
    courtReservation: number;
    image: APICourt["image"];
    latitude: APICourt["latitude"];
    longitude: APICourt["longitude"];
    texture: APICourt["texture"];
    createdAt: APICourt["createdAt"];
    updatedAt: APICourt["updatedAt"];
  }>;

  getAllCourtReservationsByDate: (
    courtId: APICourt["id"],
    date: string
  ) => ApiPromise<{
    courtId: number;
    date: string;
    reservations: {
      userId: number;
      avatarImgSrc: APIUser["profileImage"];
      courtId: number;
      reservationId: number;
      startTime: APIReservation["startTime"];
      endTime: APIReservation["endTime"];
    }[];
  }>;
}
