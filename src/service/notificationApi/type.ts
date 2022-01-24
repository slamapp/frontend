import { Notification } from "@domainTypes/.";
import { ApiPromise } from "@service/type";

export interface Api {
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
