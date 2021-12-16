export type Follow = {
  followId: number;
  followerId: number;
  followingId: number;
};

type NotificationType = "FOLLOW" | "LOUD_SPEAKER";

export interface Notification extends DefaultNotification {
  followerInfo: FollowerInfo | null;
  loudSpeakerInfo: LoudSpeakerInfo | null;
}

export interface DefaultNotification {
  type: NotificationType;
  notificationId: number;
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

export const mockNotifications: Notification[] = [
  {
    notificationId: 1,
    type: "FOLLOW",
    followerInfo: {
      userId: 1,
      userNickname: "마누",
      userImage:
        "http://k.kakaocdn.net/dn/k8AUi/btreoEKvP1M/vckoclcNHsqks2ygyWyRNK/img_640x640.jpg",
    },
    loudSpeakerInfo: null,
  },
  {
    notificationId: 2,
    type: "LOUD_SPEAKER",
    followerInfo: null,
    loudSpeakerInfo: {
      court: {
        name: "관악구민운동장 농구장",
        latitude: 38.987654,
        longitude: 12.309472,
        image:
          "https://img1.kakaocdn.net/relay/local/R1920x0/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F17F90339348B459DB61D60A1E44B8271",
        basketCount: 2,
        createdAt: "2021-01-01T12:20:10",
        updatedAt: "2021-01-01T12:20:10",
      },
      startTime: "2021-01-01T12:20:10",
    },
  },
];
export type Favorite = {
  favoriteId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};
