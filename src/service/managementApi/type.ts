import { ApiPromise } from "@service/type";

export interface ManagementApi {
  getNewCourts: (...params: any[]) => ApiPromise;
  acceptNewCourt: (...params: any[]) => ApiPromise;
  denyNewCourt: (...params: any[]) => ApiPromise;
}
