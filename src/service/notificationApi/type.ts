import { Notification } from "@contexts/AuthProvider/types";

export interface ResGetNotifications {
  contents: Notification[];
  lastId: number | null;
}
