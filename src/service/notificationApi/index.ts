import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const notificationApi: Api = {
  getNotifications: ({ size = 3, lastId, isFirst = false }) =>
    authRequest.get("/notifications", {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    }),

  readAllNotifications: () => authRequest.put("/notifications/read"),
};

export default notificationApi;
