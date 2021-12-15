import { createContext } from "react";
import { DataProps, initialData } from "./reducer";

export interface ContextProps {
  authProps: DataProps;
  getCurrentUser: any;
  logout: () => void;
}

export const initialContext = {
  authProps: initialData,
  getCurrentUser: () => {},
  logout: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
