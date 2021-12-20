import { request, authRequest, authFileRequest } from "./fetcher";

const notificationApi = {
  getNotifications: <R>({
    size = 5,
    lastId = 0,
    isFirst = false,
  }: {
    size?: number;
    lastId?: number;
    isFirst?: boolean;
  }) => {
    return authRequest.get<R, R>("/notifications", {
      params: {
        size,
        lastId,
        isFirst,
      },
    });
  },
};

export default notificationApi;
