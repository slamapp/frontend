import { Notification } from "@domainTypes/.";
import { ApiPromise } from "@service/type";

export interface NotificationApi {
  getNotifications: (param: {
    size?: number;
    lastId?: number | null;
    isFirst?: boolean;
  }) => ApiPromise<{
    contents: Notification[];
    lastId: number | null;
  }>;

  readAllNotifications: () => ApiPromise;
}
