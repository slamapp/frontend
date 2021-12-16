import { createContext } from "react";
import { DataProps, initialData } from "./reducer";
import { Notification } from "./types";

export interface ContextProps {
  authProps: DataProps;
  getCurrentUser: any;
  logout: () => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
  pushNotification: (notification: Notification) => void;
}

export const initialContext = {
  authProps: initialData,
  getCurrentUser: () => {},
  logout: () => {},
  createFavorite: () => {},
  deleteFavorite: () => {},
  pushNotification: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
