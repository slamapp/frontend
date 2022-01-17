export const notificationType = {
  FOLLOWING: "FOLLOWING",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type NotificationTypeMap = typeof notificationType;

export type NotificationType = NotificationTypeMap[keyof NotificationTypeMap];
