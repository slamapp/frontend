import { createContext } from "react";
import { DataProps } from "./reducer";
import { Notification, EditableUserProfile } from "./types";

export interface ContextProps {
  authProps: DataProps;
  setCurrentUser: (data: any) => void;
  getCurrentUser: any;
  logout: () => void;
  updateMyProfile: (editedUserProfile: EditableUserProfile) => void;
  deleteMyProfileImage: () => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  pushNotification: (notification: Notification) => void;
  unshiftNotification: (notification: Notification) => void;
  getMyFavorites: () => void;
  getMyReservations: () => void;
  getMoreNotifications: () => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
