import { createContext } from "react";
import { DataProps } from "./reducer";
import { Notification, EditableUserProfile } from "./types";

export interface ContextProps {
  authProps: DataProps;
  setCurrentUser: (data: any) => void;
  getCurrentUser: any;
  logout: () => void;
  updateUserProfile: (editedUserProfile: EditableUserProfile) => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  pushNotification: (notification: Notification) => void;
  getMyFavorites: () => void;
  getMyReservations: () => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
