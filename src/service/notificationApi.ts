import { request, authRequest, authFileRequest } from "./fetcher";

const notificationApi = {
  getNotifications: <R>({
    size = 3,
    lastId,
    isFirst = false,
  }: {
    size?: number;
    lastId?: number | null;
    isFirst?: boolean;
  }) => {
    return authRequest.get<R, R>("/notifications", {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    });
  },
};

export default notificationApi;
