import { request, authRequest, authFileRequest } from "./fetcher";

const managementAPI = {
  getNewCourts: <R>(
    status: "READY" | "DONE",
    isFirst: boolean,
    lastId: number | undefined | null
  ) => {
    return lastId
      ? authRequest.get<R, R>("/management/newCourts", {
          params: {
            status,
            isFirst,
            lastId,
            size: 10,
          },
        })
      : authRequest.get<R, R>("/management/newCourts", {
          params: {
            status,
            isFirst,
            lastId: 0,
            size: 10,
          },
        });
  },
  acceptNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/accept", newCourtId),
  denyNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
};

export default managementAPI;
