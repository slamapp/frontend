import { Action } from "@contexts/type";

export type ActionUnion =
  | Action<"SET_CURRENT_USER", any>
  | Action<"CLEAR_CURRENT_USER">
  | Action<"LOADING_ON">
  | Action<"LOADING_OFF">
  | Action<"UPDATE_MY_PROFILE", any>
  | Action<"SET_MY_PROFILE_IMAGE", any>
  | Action<"GET_MY_FAVORITES", any>
  | Action<"SET_MY_FAVORITES", any>
  | Action<"CREATE_FAVORITE", any>
  | Action<"DELETE_FAVORITE", any>
  | Action<"CONCAT_NOTIFICATIONS", any>
  | Action<"UNSHIFT_NOTIFICATION", any>
  | Action<"READ_ALL_NOTIFICATIONS">
  | Action<"SET_MY_RESERVATIONS", any>;
