import type { ApiPromise } from "@service/type";

export interface FavoriteApi {
  getMyFavorites: () => ApiPromise<{
    favorites: {
      courtId: number;
      courtName: string;
      createdAt: string;
      updatedAt: string;
      favoriteId: number;
      latitude: number;
      longitude: number;
    }[];
  }>;
  createMyFavorite: (courtId: number) => ApiPromise<{
    favoriteId: number;
    courtId: number;
    courtName: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }>;
  deleteMyFavorite: (favoriteId: number) => ApiPromise<{ favoriteId: number }>;
}
