import { ApiPromise } from "@service/type";

export interface Api {
  getMyFavorites: () => ApiPromise;
  createMyFavorite: (...params: any[]) => ApiPromise;
  deleteMyFavorite: (...params: any[]) => ApiPromise;
}
