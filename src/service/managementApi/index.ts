import type { InfiniteScrollResponse } from "~/types/common"
import type { APINewCourt } from "~/types/domains"
import { authRequest } from "../fetcher"
import type { ApiPromise } from "../type"

const managementAPI = {
  getReadyNewCourts: (
    isFirst: boolean,
    lastId?: APINewCourt["id"] | null
  ): ApiPromise<InfiniteScrollResponse<APINewCourt>> =>
    authRequest.get("/management/newCourts/ready", {
      params: { isFirst, lastId: lastId ?? 0, size: 10 },
    }),
  acceptNewCourt: (newCourtId: APINewCourt["id"]): ApiPromise<APINewCourt> =>
    authRequest.patch("/management/newCourt/accept", newCourtId),
  denyNewCourt: (newCourtId: APINewCourt["id"]): ApiPromise<APINewCourt> =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
}

export default managementAPI
