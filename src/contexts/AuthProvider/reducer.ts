import {
  Notification,
  Follow,
  Role,
  Favorite,
  Reservation,
} from "@domainTypes/.";
import { Reducer } from "react";
import { authTypes, ActionTypeUnion } from "./actionTypes";

export interface DataProps {
  currentUser: {
    userId: number | null;
    email: string | null;
    profileImageUrl: string | null;
    role: Role | null;
    description: string | null;
    nickname: string | null;
    favorites: Favorite[];
    followers: Follow[];
    following: Follow[];
    notifications: Notification[];
    notificationLastId: number | null | undefined;
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
    role: null,
    description: null,
    nickname: null,
    favorites: [],
    followers: [],
    following: [],
    notifications: [],
    notificationLastId: undefined,
    reservations: [],
  },
  isLoading: true,
};

export const reducer: Reducer<DataProps, ReducerAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case authTypes.SET_CURRENT_USER: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          userId: payload.userId,
          nickname: payload.nickname,
          notifications: [...payload.notifications],
          email: payload.email,
          positions: payload.positions,
          proficiency: payload.proficiency,
          profileImageUrl: payload.profileImage,
          role: payload.role,
          description: payload.description,
          notificationLastId:
            payload.notifications[payload.notifications.length - 1]?.id || null,
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
    case authTypes.UPDATE_MY_PROFILE: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          nickname: payload.nickname,
          positions: payload.positions,
          proficiency: payload.proficiency,
          description: payload.description,
        },
      };
    }
    case authTypes.DELETE_MY_PROFILE_IMAGE: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          profileImageUrl: payload.profileImage,
        },
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
          favorites: [...prevState.currentUser.favorites, payload.favorite],
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
    case authTypes.CREATE_RESERVATION: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          // 최신순? 현재시간에서 가장 가까운
          reservations: [
            payload.createdReservation,
            ...prevState.currentUser.reservations,
          ],
        },
      };
    }
    case authTypes.UPDATE_RESERVATION: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          reservations: prevState.currentUser.reservations.map((reservation) =>
            reservation.reservationId ===
            payload.updatedReservation.reservationId
              ? payload.updatedReservation
              : reservation
          ),
        },
      };
    }
    case authTypes.DELETE_RESERVATION: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          reservations: prevState.currentUser.reservations.filter(
            ({ reservationId }) =>
              reservationId !== payload.deletedReservationId
          ),
        },
      };
    }
    case authTypes.UNSHIFT_NOTIFICATION: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [
            payload.notification,
            ...prevState.currentUser.notifications,
          ],
        },
      };
    }
    case authTypes.CONCAT_NOTIFICATIONS: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [
            ...prevState.currentUser.notifications,
            ...payload.notifications,
          ],
          notificationLastId:
            payload.notifications.length !== 0 ? payload.lastId : null,
        },
      };
    }
    case authTypes.READ_ALL_NOTIFICATIONS: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          notifications: [
            ...prevState.currentUser.notifications.map((notification) => ({
              ...notification,
              isRead: true,
            })),
          ],
        },
      };
    }
    default: {
      return { ...prevState };
    }
  }
};
