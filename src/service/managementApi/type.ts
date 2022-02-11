import type { NewCourt } from "@domainTypes/newCourts";
import type { ApiPromise } from "@service/type";

export interface ManagementApi {
  getNewCourts: (
    status: NewCourt["status"],
    isFirst: boolean,
    lastId?: number | null
  ) => ApiPromise<{
    contents: NewCourt[];
    lastId: number;
  }>;
  acceptNewCourt: (newCourtId: NewCourt["newCourtId"]) => ApiPromise<NewCourt>;
  denyNewCourt: (newCourtId: NewCourt["newCourtId"]) => ApiPromise<NewCourt>;
}
