import { PositionKeyUnion, ProficiencyKeyUnion } from "@components/domain";

export type Role = "USER" | "ADMIN";

export type Follow = {
  followId: number;
  followerId: number;
  followingId: number;
};

type NotificationType = "FOLLOWING" | "LOUDSPEAKER";

export interface Notification extends DefaultNotification {
  followerInfo: FollowerInfo | null;
  loudspeakerInfo: LoudspeakerInfo | null;
}

export interface DefaultNotification {
  id: number;
  type: NotificationType;
  isRead: boolean;
  isClicked: boolean;
  createdAt: string;
  updatedAt: string;
}

type FollowerInfo = {
  userId: number;
  userNickname: string;
  userImage: string;
};

type LoudspeakerInfo = {
  courtInfo: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    image: string;
    basketCount: number;
    createdAt: string;
    updatedAt: string;
  };
  startTime: string;
};

export type Favorite = {
  favoriteId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type Reservation = {
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
};

export type EditableUserProfile = {
  nickname: string;
  description: string;
  proficiency: ProficiencyKeyUnion;
  positions: PositionKeyUnion[];
};
