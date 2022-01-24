import { request, authRequest, authFileRequest } from "../fetcher";
import { Api } from "./type";

const managementAPI: Api = {
  getNewCourts: (
    status: "READY" | "DONE",
    isFirst: boolean,
    lastId?: number | null
  ) =>
    authRequest.get("/management/newCourts", {
      params: {
        status,
        isFirst,
        lastId: lastId ?? 0,
        size: 10,
      },
    }),
  acceptNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/accept", newCourtId),
  denyNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
};

export default managementAPI;
