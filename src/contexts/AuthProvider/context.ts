import { createContext } from "react";
import { DataProps, initialData } from "./reducer";

export interface ContextProps {
  authProps: DataProps;
  getCurrentUser: any;
}

export const initialContext = {
  authProps: initialData,
  getCurrentUser: () => {},
};

export const Context = createContext<ContextProps>(initialContext);
