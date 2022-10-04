import type { ActionWithoutPayload, ActionWithPayload } from "~/contexts/type"
import type {
  APIFavorite,
  APINotification,
  APIUser,
} from "~/types/domains/objects"

export type ActionUnion =
  | ActionWithPayload<
      "SET_CURRENT_USER",
      { user: APIUser; notifications: APINotification[] }
    >
  | ActionWithoutPayload<"CLEAR_CURRENT_USER">
  | ActionWithoutPayload<"LOADING_ON">
  | ActionWithoutPayload<"LOADING_OFF">
  | ActionWithPayload<"SET_MY_PROFILE_IMAGE", Pick<APIUser, "profileImage">>
  | ActionWithPayload<"GET_MY_FAVORITES", { favorites: APIFavorite[] }>
  | ActionWithPayload<"SET_MY_FAVORITES", any>
  | ActionWithPayload<"CREATE_FAVORITE", any>
  | ActionWithPayload<"DELETE_FAVORITE", any>
  | ActionWithPayload<
      "CONCAT_NOTIFICATIONS",
      { notifications: APINotification[]; lastId: any }
    >
  | ActionWithPayload<"UNSHIFT_NOTIFICATION", any>
  | ActionWithoutPayload<"READ_ALL_NOTIFICATIONS">
  | ActionWithPayload<"SET_MY_RESERVATIONS", any>
