import type { CommonObject, OmitAt } from "./common";
import type { Follow } from "./follow";
import type { Loudspeaker } from "./loudspeaker";

export interface Notification extends CommonObject {
  type: NotificationType;
  follow?: OmitAt<Follow>;
  loudspeaker?: OmitAt<Loudspeaker>;
  isRead: boolean;
  isClicked: boolean;
}

export const notificationType = {
  FOLLOWING: "FOLLOWING",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type NotificationTypeMap = typeof notificationType;

export type NotificationType = NotificationTypeMap[keyof NotificationTypeMap];
