import type { NewCourt } from "@domainTypes/newCourts";
import type { ApiPromise } from "@service/type";

export interface ManagementApi {
  getNewCourts: (
    status: NewCourt["status"],
    isFirst: boolean,
    lastId?: NewCourt["newCourtId"] | null
  ) => ApiPromise<{
    contents: NewCourt[];
    lastId: NewCourt["newCourtId"] | null;
  }>;
  acceptNewCourt: (newCourtId: NewCourt["newCourtId"]) => ApiPromise<NewCourt>;
  denyNewCourt: (newCourtId: NewCourt["newCourtId"]) => ApiPromise<NewCourt>;
}
