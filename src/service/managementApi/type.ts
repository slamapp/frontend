import { ApiPromise } from "@service/type";

export interface Api {
  getNewCourts: (...params: any[]) => ApiPromise;
  acceptNewCourt: (...params: any[]) => ApiPromise;
  denyNewCourt: (...params: any[]) => ApiPromise;
}
