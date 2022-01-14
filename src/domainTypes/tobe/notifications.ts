import { CommonObject } from "./common";
import { Follow } from "./follows";
import { Loudspeaker } from "./loudspeaker";

export const notificationTypes = {
  FOLLOWING: "FOLLOWING",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type NotificationTypeMap = typeof notificationTypes;

export type NotificationType = NotificationTypeMap[keyof NotificationTypeMap];

export interface Notification extends CommonObject {
  type: NotificationType;
  // follow | loudspeaker 알림
  follow?: Follow;
  loudspeaker?: Loudspeaker;
  isRead: boolean;
  isClicked: boolean;
}
