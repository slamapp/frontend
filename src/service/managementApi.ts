import { request, authRequest, authFileRequest } from "./fetcher";

const managementAPI = {
  getNewCourts: <R>(status: "READY" | "DONE") =>
    authRequest.get<R, R>("/management/newCourts", {
      params: {
        status,
      },
    }),
  acceptNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourts/accept", newCourtId),
  denyNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
};

export default managementAPI;
