import { ApiPromise } from "@service/type";

export interface UserApi {
  getUserData: () => ApiPromise;
  getMyProfile: () => ApiPromise;
  getUserProfile: (...params: any[]) => ApiPromise;
  updateMyProfile: (...params: any[]) => ApiPromise;
  deleteMyProfileImage: () => ApiPromise;
}