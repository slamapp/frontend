import type { NewCourt } from "@domainTypes/newCourts";
import type { ApiPromise } from "@service/type";

export interface ManagementApi {
  getNewCourts: (
    status: "READY" | "DONE",
    isFirst: boolean,
    lastId?: number | null
  ) => ApiPromise<{
    contents: NewCourt[];
    lastId: number;
  }>;
  acceptNewCourt: (...params: any[]) => ApiPromise;
  denyNewCourt: (...params: any[]) => ApiPromise;
}
