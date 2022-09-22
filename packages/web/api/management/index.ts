import { http } from "~/api/core"
import type { InfiniteScrollResponse } from "~/types/common"
import type { APINewCourt } from "~/types/domains"

export default {
  getReadyNewCourts: (isFirst: boolean, lastId?: APINewCourt["id"] | null) =>
    http.auth.get<InfiniteScrollResponse<APINewCourt>>(
      "/management/newCourts/ready",
      {
        params: { isFirst, lastId: lastId ?? 0, size: 10 },
      }
    ),

  acceptNewCourt: (newCourtId: APINewCourt["id"]) =>
    http.auth.patch<APINewCourt>("/management/newCourt/accept", {
      data: newCourtId,
    }),

  denyNewCourt: (newCourtId: APINewCourt["id"]) =>
    http.auth.patch<APINewCourt>("/management/newCourt/deny", {
      data: newCourtId,
    }),
} as const
