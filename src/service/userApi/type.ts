import type { APINotification, APIUser } from "@domainTypes/tobe";
import type { ApiPromise } from "@service/type";

export interface UserApi {
  getUserData: () => ApiPromise<{
    user: APIUser;
    notifications: APINotification[];
  }>;
  getMyProfile: () => ApiPromise<{
    followerCount: number;
    followingCount: number;
    user: APIUser;
  }>;
  getUserProfile: (userId: APIUser["id"]) => ApiPromise;
  updateMyProfile: (...params: any[]) => ApiPromise;
  updateMyProfileImage: (editedProfileImageFile: File) => ApiPromise;
  deleteMyProfileImage: () => ApiPromise;
}
