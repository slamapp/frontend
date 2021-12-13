export type Follow = {
  followId: number;
  followerId: number;
  followingId: number;
};

export type Notification = {
  notificationId: number;
  courtId: number;
  userId: number;
  content: string;
  notificationType: string;
};
