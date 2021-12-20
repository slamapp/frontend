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
            size: 2,
          },
        })
      : authRequest.get<R, R>("/management/newCourts", {
          params: {
            status,
            isFirst,
            lastId: 0,
            size: 2,
          },
        });
  },
  acceptNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourts/accept", newCourtId),
  denyNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
};

export default managementAPI;
