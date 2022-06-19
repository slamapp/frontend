import type { Reducer } from "react"
import type { OmitAt } from "~/types/common"
import type {
  APINotification,
  APIUser,
  APIFavorite,
  APIReservation,
} from "~/types/domains"
import type { ActionUnion } from "./actionTypes"

export interface DataProps {
  currentUser: OmitAt<APIUser> | null
  favorites: APIFavorite[]
  notifications: APINotification[]
  notificationLastId?: APINotification["id"] | null
  reservations: APIReservation[]
  isLoading: boolean
}

export const initialData = {
  currentUser: null,
  favorites: [],
  notifications: [],
  notificationLastId: undefined,
  reservations: [],
  isLoading: true,
}

export const reducer: Reducer<DataProps, ActionUnion> = (prevState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      const { user, notifications } = action.payload
      const {
        id,
        nickname,
        email,
        positions,
        proficiency,
        profileImage,
        role,
        description,
      } = user

      return {
        ...prevState,
        currentUser: {
          id,
          nickname,
          email,
          positions,
          proficiency,
          profileImage,
          role,
          description,
        },
        notificationLastId: notifications[notifications.length - 1]?.id || null,
        notifications: [...notifications],
      }
    }

    case "CLEAR_CURRENT_USER": {
      return {
        ...prevState,
        ...initialData,
      }
    }
    case "LOADING_ON": {
      return {
        ...prevState,
        isLoading: true,
      }
    }
    case "LOADING_OFF": {
      return {
        ...prevState,
        isLoading: false,
      }
    }
    case "UPDATE_MY_PROFILE": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { nickname, positions, proficiency, description } = action.payload

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          nickname,
          positions,
          proficiency,
          description,
        },
      }
    }

    case "SET_MY_PROFILE_IMAGE": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { profileImage } = action.payload

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          profileImage,
        },
      }
    }

    case "GET_MY_FAVORITES": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { favorites } = action.payload

      return {
        ...prevState,
        favorites: [...favorites],
      }
    }
    case "CREATE_FAVORITE": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { favorite } = action.payload

      return {
        ...prevState,
        favorites: [...prevState.favorites, favorite],
      }
    }
    case "DELETE_FAVORITE": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { deletedFavoriteId } = action.payload

      return {
        ...prevState,
        favorites: prevState.favorites.filter(
          ({ id }) => id !== deletedFavoriteId
        ),
      }
    }
    case "SET_MY_RESERVATIONS": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { reservations } = action.payload

      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          reservations: [...reservations],
        },
      }
    }
    case "UNSHIFT_NOTIFICATION": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { notification } = action.payload

      return {
        ...prevState,
        notifications: [notification, ...prevState.notifications],
      }
    }
    case "CONCAT_NOTIFICATIONS": {
      if (prevState.currentUser === null) {
        return prevState
      }
      const { notifications, lastId } = action.payload

      return {
        ...prevState,
        notifications: [...prevState.notifications, ...notifications],
        notificationLastId: notifications.length !== 0 ? lastId : null,
      }
    }
    case "READ_ALL_NOTIFICATIONS": {
      if (prevState.currentUser === null) {
        return prevState
      }

      return {
        ...prevState,
        notifications: [
          ...prevState.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        ],
      }
    }

    default: {
      return prevState
    }
  }
}
