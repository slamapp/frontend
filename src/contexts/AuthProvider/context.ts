import { createContext } from "react";
import { DataProps, initialData } from "./reducer";
import { Notification } from "./types";

export interface ContextProps {
  authProps: DataProps;
  setCurrentUser: (data: any) => void;
  getCurrentUser: any;
  logout: () => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  pushNotification: (notification: Notification) => void;
  getMyFavorites: () => void;
  getMyReservations: () => void;
}

export const initialContext = {
  authProps: initialData,
  setCurrentUser: () => {},
  getCurrentUser: () => {},
  logout: () => {},
  createFavorite: () => {},
  deleteFavorite: () => {},
  pushNotification: () => {},
  getMyFavorites: () => {},
  getMyReservations: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
