import { ApiPromise } from "@service/type";

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise;
  createMyFavorite: (...params: any[]) => ApiPromise;
  deleteMyFavorite: (...params: any[]) => ApiPromise;
}
