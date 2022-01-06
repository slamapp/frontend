import { request, authRequest, authFileRequest } from "../fetcher";
import { ResGetNotifications } from "./type";

const notificationApi = {
  getNotifications: ({
    size = 3,
    lastId,
    isFirst = false,
  }: {
    size?: number;
    lastId?: number | null;
    isFirst?: boolean;
  }) =>
    authRequest.get<ResGetNotifications, ResGetNotifications>(
      "/notifications",
      {
        params: {
          size,
          lastId: lastId || 0,
          isFirst,
        },
      }
    ),

  readAllNotifications: () => authRequest.put("/notifications/read"),
};

export default notificationApi;
