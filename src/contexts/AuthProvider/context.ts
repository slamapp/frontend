import { Notification, EditableUserProfile } from "@domainTypes/.";
import { createContext } from "react";
import { DataProps } from "./reducer";

export interface ContextProps {
  authProps: DataProps;
  setCurrentUser: (data: any) => void;
  getCurrentUser: any;
  logout: () => void;
  updateMyProfile: (editedUserProfile: EditableUserProfile) => void;
  deleteMyProfileImage: () => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  unshiftNotification: (notification: Notification) => void;
  getMyFavorites: () => void;
  getMyReservations: () => void;
  readAllNotifications: () => void;
  getMoreNotifications: () => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
