import { Notification } from "@domainTypes/.";

export interface Api {
  getNotifications: (params: {
    size?: number;
    lastId?: number | null;
    isFirst?: boolean;
  }) => Promise<{
    contents: Notification[];
    lastId: number | null;
  }>;

  readAllNotifications: () => Promise<any>;
}
