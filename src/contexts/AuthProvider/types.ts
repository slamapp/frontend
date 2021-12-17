export type Follow = {
  followId: number;
  followerId: number;
  followingId: number;
};

type NotificationType = "FOLLOW" | "LOUDSPEAKER";

export interface Notification extends DefaultNotification {
  followerInfo: FollowerInfo | null;
  loudSpeakerInfo: LoudSpeakerInfo | null;
}

export interface DefaultNotification {
  type: NotificationType;
  notificationId: number;
  isRead: boolean;
  isClicked: boolean;
  created: string;
  updated: string;
}

type FollowerInfo = {
  userId: number;
  userNickname: string;
  userImage: string;
};

type LoudSpeakerInfo = {
  court: {
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
