import { createContext } from "react"
import type {
  APICourt,
  APIFavorite,
  APINotification,
  APIUser,
} from "~/types/domains/objects"
import type { DataProps } from "./reducer"

export interface ContextProps {
  authProps: DataProps

  setCurrentUser: (data: {
    user: APIUser
    notifications: APINotification[]
  }) => void
  getCurrentUser: () => Promise<void>
  logout: () => void
  createFavorite: (courtId: APICourt["id"]) => Promise<void>
  deleteFavorite: (favoriteId: APIFavorite["id"]) => Promise<void>
  unshiftNotification: (notification: APINotification) => void
  getMyFavorites: () => Promise<void>
  getMyReservations: () => Promise<void>
  readAllNotifications: () => Promise<void>
  getMoreNotifications: () => Promise<void>
  authProviderInit: () => Promise<void>
}

const Context = createContext<ContextProps>({} as ContextProps)

export default Context
