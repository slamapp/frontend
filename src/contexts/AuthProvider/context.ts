import { createContext } from "react";
import { DataProps, initialData } from "./reducer";

export interface ContextProps {
  authProps: DataProps;
  getCurrentUser: any;
  logout: () => void;
  createFavorite: (courtId: number) => void;
  deleteFavorite: (favoriteId: number) => void;
}

export const initialContext = {
  authProps: initialData,
  getCurrentUser: () => {},
  logout: () => {},
  createFavorite: () => {},
  deleteFavorite: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
