import { APINotification } from "@domainTypes/tobe/notification";
import { ApiPromise } from "@service/type";

export interface NotificationApi {
  getNotifications: (param: {
    size?: number;
    lastId?: APINotification["id"] | null;
    isFirst?: boolean;
  }) => ApiPromise<{
    contents: APINotification[];
    lastId: APINotification["id"] | null;
  }>;

  readAllNotifications: () => ApiPromise;
}
