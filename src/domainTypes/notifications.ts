export interface Notification extends DefaultNotification {
  followerInfo: FollowerInfo | null;
  loudspeakerInfo: LoudspeakerInfo | null;
}

export const notificationTypes = {
  FOLLOWING: "FOLLOWING",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

export type NotificationType = NotificationTypeMap[keyof NotificationTypeMap];

interface DefaultNotification {
  id: number;
  type: NotificationType;
  isRead: boolean;
  isClicked: boolean;
  createdAt: string;
  updatedAt: string;
}

type NotificationTypeMap = typeof notificationTypes;

interface FollowerInfo {
  userId: number;
  userNickname: string;
  userImage: string;
}

interface LoudspeakerInfo {
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
}
