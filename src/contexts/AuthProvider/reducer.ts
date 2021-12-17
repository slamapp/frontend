import { Reducer } from "react";
import { authTypes, ActionTypeUnion } from "./actionTypes";
import { Follow, Favorite, Notification, Reservation } from "./types";

export interface DataProps {
  currentUser: {
    userId: number | null;
    email: string | null;
    profileImageUrl: string | null;
    skill: string | null;
    role: string | null;
    description: string | null;
    nickname: string | null;
    favorites: Favorite[];
    followers: Follow[];
    following: Follow[];
    notifications: Notification[];
    reservations: Reservation[];
  };
  isLoading: boolean;
}

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};

export const initialData = {
  currentUser: {
    userId: null,
    email: null,
    profileImageUrl: null,
    skill: null,
    role: null,
    description: null,
    nickname: null,
    favorites: [
      {
        favoriteId: 1,
        courtId: 3,
        courtName: "용왕산 근린 공원 농구장",
        latitude: 34.567234,
        longitude: 12.493048,
        createdAt: "2021-01-01T12:20:10",
        updatedAt: "2021-01-01T12:20:10",
      },
      {
        favoriteId: 2,
        courtId: 4,
        courtName: "한강공원 농구장",
        latitude: 34.567234,
        longitude: 12.493048,
        createdAt: "2021-01-01T12:20:10",
        updatedAt: "2021-01-01T12:20:10",
      },
    ],
    followers: [],
    following: [],
    notifications: [],
    reservations: [],
  },
  isLoading: true,
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case authTypes.GET_CURRENT_USER: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          userId: payload.id,
          nickname: payload.nickname,
          notifications: [...payload.notifications],
          email: payload.email,
          positions: payload.positions,
          proficiency: payload.proficiency,
          profileImageUrl: payload.profileImage,
          role: payload.role,
          description: payload.description,
        },
      };
    }
    case authTypes.CLEAR_CURRENT_USER: {
      return {
        ...prevState,
        ...initialData,
      };
    }
    case authTypes.LOADING_ON: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: true,
      };
    }
    case authTypes.LOADING_OFF: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: false,
      };
    }
    case authTypes.GET_MY_FAVORITES: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: payload.favorites,
        },
      };
    }
    case authTypes.CREATE_FAVORITE: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: [payload.favorite, ...prevState.currentUser.favorites],
        },
      };
    }
    case authTypes.DELETE_FAVORITE: {
      const { deletedFavoriteId } = payload;
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: prevState.currentUser.favorites.filter(
            ({ favoriteId }) => favoriteId !== deletedFavoriteId
          ),
        },
      };
    }
    case authTypes.SET_MY_RESERVATIONS: {
      const { reservations } = payload;
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          reservations: [...reservations],
        },
      };
    }
    default: {
      return { ...prevState };
    }
  }
};
