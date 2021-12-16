import { Reducer } from "react";
import { actionTypes, ActionTypeUnion } from "./actionTypes";
import { Follow, Favorite, mockNotifications, Notification } from "./types";

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
    notifications: [...mockNotifications],
  },
  isLoading: true,
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GET_CURRENT_USER: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          userId: payload.id,
          nickname: payload.nickname,
          // notifications: payload.notifications,
          email: payload.email,
          positions: payload.positions,
          proficiency: payload.proficiency,
          profileImageUrl: payload.profileImage,
          role: payload.role,
          description: payload.description,
        },
      };
    }
    case actionTypes.CLEAR_CURRENT_USER: {
      return {
        ...prevState,
        ...initialData,
      };
    }
    case actionTypes.LOADING_ON: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: true,
      };
    }
    case actionTypes.LOADING_OFF: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
        },
        isLoading: false,
      };
    }
    case actionTypes.CREATE_FAVORITE: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          favorites: [payload.favorite, ...prevState.currentUser.favorites],
        },
      };
    }
    case actionTypes.DELETE_FAVORITE: {
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
    default: {
      return { ...prevState };
    }
  }
};
